import Stripe from 'stripe';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Order, { type IOrder, type IOrderItem } from '@/models/Order';
import Product from '@/models/Product';
import { revalidateProducts } from '@/lib/revalidate-products';
import { sendLeadNotificationEmail, sendOrderConfirmationEmail } from '@/lib/mailer';

const money = (cents?: number | null) => Math.round(cents || 0) / 100;

/** Next order number: MA-1001, MA-1002, ... (atomic counter in the `counters` collection). */
async function nextOrderNumber(): Promise<string> {
  const counters = mongoose.connection.db!.collection<{ _id: string; seq: number }>('counters');
  const res = await counters.findOneAndUpdate(
    { _id: 'order' },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: 'after' }
  );
  const seq = (res && 'seq' in res ? res.seq : (res as any)?.value?.seq) || 1;
  return `MA-${1000 + seq}`;
}

/** Take sold units off kiosk stock. Order-in items aren't held, so they're left alone. */
async function reduceKioskStock(items: IOrderItem[]) {
  let changed = false;
  for (const it of items) {
    if (it.orderIn || !it.productId || !/^[a-f0-9]{24}$/i.test(it.productId)) continue;
    const _id = new mongoose.Types.ObjectId(it.productId);
    const q = it.quantity;
    if (it.sku) {
      // Option-level stock when the option tracks it.
      const r = await Product.updateOne(
        { _id, variants: { $elemMatch: { sku: it.sku, stock: { $gte: q } } } },
        { $inc: { 'variants.$.stock': -q } }
      );
      if (r.modifiedCount) {
        changed = true;
        continue;
      }
      const z = await Product.updateOne(
        { _id, variants: { $elemMatch: { sku: it.sku, stock: { $type: 'number' } } } },
        { $set: { 'variants.$.stock': 0 } }
      );
      if (z.modifiedCount) {
        changed = true;
        continue;
      }
    }
    // Product-level stock, never below zero.
    const r = await Product.updateOne({ _id, stock: { $type: 'number' } }, [
      { $set: { stock: { $max: [0, { $subtract: ['$stock', q] }] } } },
    ]);
    if (r.modifiedCount) changed = true;
  }
  if (changed) {
    try {
      revalidateProducts();
    } catch {}
  }
}

/**
 * Save a paid Checkout session as an order. Safe to call more than once for the
 * same session (Stripe retries webhooks): only the first call creates the order,
 * reduces stock and sends the emails.
 */
export async function recordPaidOrder(stripe: Stripe, sessionId: string): Promise<IOrder | null> {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== 'paid') return null;

  await dbConnect();
  const existing = await Order.findOne({ stripeSessionId: session.id });
  if (existing) return existing;

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ['data.price.product'],
  });

  // Which products are ordered in (not held at the kiosk)?
  const ids = lineItems.data
    .map((li) => ((li.price?.product as Stripe.Product | undefined)?.metadata?.productId || '') as string)
    .filter((id) => /^[a-f0-9]{24}$/i.test(id));
  const docs: any[] = ids.length
    ? await Product.find({ _id: { $in: ids } }, { fulfilment: 1, imageUrl: 1 }).lean()
    : [];
  const byId = new Map(docs.map((d) => [String(d._id), d]));

  const items: IOrderItem[] = lineItems.data.map((li) => {
    const prod = li.price?.product as Stripe.Product | undefined;
    const productId = prod?.metadata?.productId || undefined;
    const d = productId ? byId.get(productId) : undefined;
    return {
      productId,
      sku: prod?.metadata?.sku || undefined,
      name: li.description || prod?.name || 'Item',
      quantity: li.quantity || 1,
      unitPrice: money(li.price?.unit_amount),
      image: prod?.images?.[0] || d?.imageUrl,
      orderIn: d?.fulfilment === 'order-in',
    };
  });

  const details = session.customer_details;
  const ship = (session as any).shipping_details || (session as any).collected_information?.shipping_details;
  const addr = ship?.address;
  const fulfilment = session.metadata?.fulfilment === 'delivery' ? 'delivery' : 'collect';

  let order: IOrder;
  try {
    order = await Order.create({
      orderNumber: await nextOrderNumber(),
      stripeSessionId: session.id,
      paymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
      status: 'paid',
      fulfilment,
      customer: {
        name: details?.name || ship?.name || undefined,
        email: details?.email || session.customer_email || undefined,
        phone: details?.phone || undefined,
      },
      shippingAddress: addr
        ? {
            line1: addr.line1 || undefined,
            line2: addr.line2 || undefined,
            city: addr.city || undefined,
            state: addr.state || undefined,
            postcode: addr.postal_code || undefined,
            country: addr.country || undefined,
          }
        : undefined,
      items,
      subtotal: money(session.amount_subtotal),
      bundleSaving: Number(session.metadata?.bundleSaving || 0),
      shipping: money(session.total_details?.amount_shipping),
      total: money(session.amount_total),
      currency: session.currency || 'aud',
    });
  } catch (e: any) {
    // Two webhook deliveries at once: the other one saved it first.
    if (e?.code === 11000) return Order.findOne({ stripeSessionId: session.id });
    throw e;
  }

  await reduceKioskStock(items).catch((e) => console.error('[orders] stock update failed', e));

  // Shop notification (same email the shop already gets, now with the order number).
  const itemsText = items
    .map((i) => `${i.quantity} x ${i.name} ($${(i.unitPrice * i.quantity).toFixed(2)})${i.orderIn ? ' [order in from Crazy Parts]' : ''}`)
    .join('\n');
  await sendLeadNotificationEmail({
    type: 'PRODUCT_ORDER',
    name: order.customer.name,
    phone: order.customer.phone,
    email: order.customer.email,
    productName: `${order.orderNumber} · ${fulfilment === 'collect' ? 'CLICK & COLLECT' : 'DELIVERY'}`,
    quantity: String(items.reduce((n, i) => n + i.quantity, 0)),
    deliveryAddress: addr
      ? [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code, addr.country].filter(Boolean).join(', ')
      : fulfilment === 'collect'
        ? 'Collecting from the kiosk'
        : undefined,
    message: `${itemsText}\n\nPaid: $${order.total.toFixed(2)} AUD${
      order.bundleSaving > 0 ? ` (bundle saving $${order.bundleSaving.toFixed(2)})` : ''
    }\nManage: ${process.env.NEXT_PUBLIC_APP_URL || 'https://www.mobilearmour.com.au'}/admin/orders\nStripe session: ${session.id}`,
  }).catch((e) => console.error('[orders] shop email failed', e));

  // Customer confirmation.
  if (order.customer.email) {
    const sent = await sendOrderConfirmationEmail(order).catch((e) => {
      console.error('[orders] customer email failed', e);
      return false;
    });
    if (sent) await Order.updateOne({ _id: order._id }, { $set: { customerEmailSent: true } });
  }

  return order;
}

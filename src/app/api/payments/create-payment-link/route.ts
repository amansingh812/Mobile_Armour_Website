import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { currentPrice } from '@/lib/products';
import { priceCart, type Fulfilment, type PricedItem } from '@/lib/pricing';
import { STORE } from '@/data/store-settings';
import { BUSINESS, fullAddress } from '@/data/business';
import { SITE_URL } from '@/lib/site';

// Creates a Stripe Checkout session for the cart.
// The browser sends only product ids and quantities: every price, the bundle
// discount and the delivery fee are worked out here from the database, so a
// visitor can't change what they pay.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const MAX_QTY = 20;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fulfilment: Fulfilment = body?.fulfilment === 'delivery' ? 'delivery' : 'collect';
    if (fulfilment === 'collect' && !STORE.clickAndCollect.enabled) {
      return NextResponse.json({ error: 'Click & collect is not available' }, { status: 400 });
    }
    if (fulfilment === 'delivery' && !STORE.delivery.enabled) {
      return NextResponse.json({ error: 'Delivery is not available' }, { status: 400 });
    }

    const wanted = new Map<string, number>();
    for (const it of Array.isArray(body?.items) ? body.items : []) {
      const id = String(it?.id || '');
      const qty = Math.floor(Number(it?.quantity));
      if (!/^[a-f0-9]{24}$/i.test(id) || !(qty > 0)) continue;
      wanted.set(id, Math.min(MAX_QTY, (wanted.get(id) || 0) + qty));
    }
    if (wanted.size === 0 || wanted.size > 50) {
      return NextResponse.json({ error: 'Your cart is empty' }, { status: 400 });
    }

    await dbConnect();
    const docs: any[] = await Product.find({ _id: { $in: Array.from(wanted.keys()) } }).lean();
    if (docs.length !== wanted.size) {
      return NextResponse.json({ error: 'Some items are no longer available. Please refresh your cart.' }, { status: 409 });
    }
    const outOfStock = docs.filter((d) =>
      d.fulfilment === 'order-in'
        ? d.supplier?.inStock === false
        : typeof d.stock === 'number' && d.stock < (wanted.get(String(d._id)) || 0)
    );
    if (outOfStock.length) {
      return NextResponse.json(
        { error: `Not enough stock for: ${outOfStock.map((d) => d.name).join(', ')}` },
        { status: 409 }
      );
    }

    const items: PricedItem[] = docs.map((d) => ({
      id: String(d._id),
      name: d.name,
      unitPrice: currentPrice(d),
      quantity: wanted.get(String(d._id)) || 1,
      category: d.category,
      devices: Array.isArray(d.deviceCompatibility) ? d.deviceCompatibility : [],
    }));
    const totals = priceCart(items, fulfilment);
    const imageOf = new Map(docs.map((d) => [String(d._id), d.imageUrl as string]));

    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
    if (totals.bundleSaving > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(totals.bundleSaving * 100),
        currency: 'aud',
        duration: 'once',
        max_redemptions: 1,
        name: `${STORE.bundle.label} (${STORE.bundle.discountPercent}% off)`,
      });
      discounts = [{ coupon: coupon.id }];
    }

    const base = process.env.NEXT_PUBLIC_APP_URL || SITE_URL;
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: items.map((i) => {
        const img = imageOf.get(i.id);
        return {
          quantity: i.quantity,
          price_data: {
            currency: 'aud',
            unit_amount: Math.round(i.unitPrice * 100),
            product_data: {
              name: i.name.slice(0, 250),
              images: img && img.startsWith('https://') ? [img] : [],
              metadata: { productId: i.id },
            },
          },
        };
      }),
      discounts,
      phone_number_collection: { enabled: true },
      billing_address_collection: 'auto',
      success_url: `${base}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/cart`,
      metadata: {
        fulfilment,
        bundleSaving: totals.bundleSaving.toFixed(2),
        items: items.map((i) => `${i.id}x${i.quantity}`).join(',').slice(0, 480),
      },
      custom_text: {
        submit: {
          message:
            fulfilment === 'collect'
              ? `Click & collect from ${fullAddress}. We'll text you when it's ready (${STORE.clickAndCollect.readyText}).`
              : `Delivery by ${STORE.delivery.carrier}, ${STORE.delivery.timeText}.`,
        },
      },
    };

    if (fulfilment === 'delivery') {
      params.shipping_address_collection = { allowed_countries: [...STORE.delivery.countries] };
      params.shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: totals.shipping === 0 ? 'Free delivery' : `Delivery (${STORE.delivery.carrier})`,
            fixed_amount: { amount: Math.round(totals.shipping * 100), currency: 'aud' },
          },
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: session.url, sessionId: session.id, totals });
  } catch (error: any) {
    console.error('[create-payment-link] failed:', error);
    return NextResponse.json(
      { error: `We couldn't start checkout. Please try again or call ${BUSINESS.phoneDisplay}.` },
      { status: 500 }
    );
  }
}

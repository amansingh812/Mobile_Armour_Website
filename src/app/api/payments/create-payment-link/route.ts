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
// The browser sends only product ids, chosen options and quantities: every price, the bundle
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

    // One line per product option. The browser says which product, option (sku)
    // and phone; everything else comes from the database.
    interface Line {
      id: string;
      sku?: string;
      model?: string;
      quantity: number;
    }
    const lines = new Map<string, Line>();
    for (const it of Array.isArray(body?.items) ? body.items : []) {
      const id = String(it?.id || '');
      const qty = Math.floor(Number(it?.quantity));
      const sku = typeof it?.sku === 'string' && it.sku ? it.sku.slice(0, 80) : undefined;
      const model = typeof it?.model === 'string' && it.model ? it.model.slice(0, 60) : undefined;
      if (!/^[a-f0-9]{24}$/i.test(id) || !(qty > 0)) continue;
      const key = `${id}::${sku || ''}::${model || ''}`;
      const prev = lines.get(key);
      lines.set(key, { id, sku, model, quantity: Math.min(MAX_QTY, (prev?.quantity || 0) + qty) });
    }
    if (lines.size === 0 || lines.size > 50) {
      return NextResponse.json({ error: 'Your cart is empty' }, { status: 400 });
    }

    await dbConnect();
    const ids = Array.from(new Set(Array.from(lines.values()).map((l) => l.id)));
    const docs: any[] = await Product.find({ _id: { $in: ids } }).lean();
    const byId = new Map(docs.map((d) => [String(d._id), d]));
    if (docs.length !== ids.length) {
      return NextResponse.json({ error: 'Some items are no longer available. Please refresh your cart.' }, { status: 409 });
    }

    const items: (PricedItem & { image?: string; productId: string; sku?: string })[] = [];
    const problems: string[] = [];
    for (const [key, l] of lines) {
      const d = byId.get(l.id)!;
      const orderIn = d.fulfilment === 'order-in';
      const variants: any[] = Array.isArray(d.variants) ? d.variants : [];
      if (variants.length) {
        // No option sent (a cart saved before options existed): a single-option product has only one choice.
        const v = variants.find((x) => x.sku === l.sku) || (!l.sku && variants.length === 1 ? variants[0] : undefined);
        // The option must exist and fit the phone the customer picked.
        if (!v || (l.model && !(v.models || []).includes(l.model))) {
          problems.push(d.name);
          continue;
        }
        const available = orderIn ? v.supplier?.inStock !== false : typeof v.stock !== 'number' || v.stock >= l.quantity;
        if (!available) {
          problems.push(`${d.name} (${[l.model, v.colour].filter(Boolean).join(', ')})`);
          continue;
        }
        const label = [l.model || (v.models || [])[0], v.colour].filter(Boolean).join(' · ');
        items.push({
          id: key,
          productId: l.id,
          sku: v.sku,
          name: label ? `${d.name} (${label})` : d.name,
          unitPrice: v.price,
          quantity: l.quantity,
          category: d.category,
          devices: l.model ? [l.model] : v.models || [],
          image: (v.images || [])[0] || d.imageUrl,
        });
      } else {
        const available = orderIn
          ? d.supplier?.inStock !== false
          : typeof d.stock !== 'number' || d.stock >= l.quantity;
        if (!available) {
          problems.push(d.name);
          continue;
        }
        items.push({
          id: key,
          productId: l.id,
          name: d.name,
          unitPrice: currentPrice(d),
          quantity: l.quantity,
          category: d.category,
          devices: Array.isArray(d.deviceCompatibility) ? d.deviceCompatibility : [],
          image: d.imageUrl,
        });
      }
    }
    if (problems.length) {
      return NextResponse.json({ error: `Not available right now: ${problems.join(', ')}` }, { status: 409 });
    }

    const totals = priceCart(items, fulfilment);

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
        const img = i.image;
        return {
          quantity: i.quantity,
          price_data: {
            currency: 'aud',
            unit_amount: Math.round(i.unitPrice * 100),
            product_data: {
              name: i.name.slice(0, 250),
              images: img && img.startsWith('https://') ? [img] : [],
              metadata: { productId: i.productId, ...(i.sku ? { sku: i.sku } : {}) },
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
        items: items.map((i) => `${i.productId}${i.sku ? `:${i.sku}` : ''}x${i.quantity}`).join(',').slice(0, 480),
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

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { recordPaidOrder } from '@/lib/orders';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// GET /api/orders?session_id=cs_...  The thank-you page asks for its order here.
// Returns only what the buyer already saw at checkout (no address, email or phone).
// If the Stripe webhook hasn't arrived yet, this saves the order itself (same
// idempotent code path), so a paid order is never lost.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('session_id') || '';
  if (!/^cs_(live|test)_[A-Za-z0-9]{10,200}$/.test(id)) {
    return NextResponse.json({ error: 'bad session' }, { status: 400 });
  }
  try {
    await dbConnect();
    let order = await Order.findOne({ stripeSessionId: id }).lean();
    if (!order) {
      const saved = await recordPaidOrder(stripe, id);
      order = saved ? (saved.toObject() as any) : null;
    }
    if (!order) return NextResponse.json({ status: 'pending' }, { status: 202 });
    return NextResponse.json(
      {
        orderNumber: order.orderNumber,
        fulfilment: order.fulfilment,
        total: order.total,
        shipping: order.shipping,
        currency: order.currency,
        items: order.items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          image: i.image,
          sku: i.sku,
          productId: i.productId,
          orderIn: !!i.orderIn,
        })),
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (e) {
    console.error('[orders] lookup failed', e);
    return NextResponse.json({ error: 'lookup failed' }, { status: 500 });
  }
}

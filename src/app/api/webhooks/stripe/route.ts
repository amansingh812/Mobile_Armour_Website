import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { recordPaidOrder } from '@/lib/orders';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe calls this after checkout. A paid Checkout session becomes an order
// (saved, stock reduced, shop and customer emailed) in src/lib/orders.ts.
export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === 'paid') {
          const order = await recordPaidOrder(stripe, session.id);
          console.log('[stripe] order saved', order?.orderNumber, session.id);
        }
        break;
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent;
        console.log('[stripe] payment failed', pi.id, pi.last_payment_error?.message);
        break;
      }
      default:
        break;
    }
  } catch (error) {
    // Let Stripe retry: saving is idempotent per session.
    console.error('[stripe] webhook handling failed', event.type, error);
    return NextResponse.json({ error: 'handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendLeadNotificationEmail } from '@/lib/mailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log('Received Stripe webhook event:', event.type);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);
      break;
    
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentIntentSucceeded(paymentIntent);
      break;
    
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      await handlePaymentIntentFailed(failedPayment);
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing completed checkout session:', session.id);
    if (session.payment_status !== 'paid') return;

    // Tell the shop about the order so it can be packed or set aside for collection.
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
    const fulfilment = session.metadata?.fulfilment === 'delivery' ? 'delivery' : 'collect';
    const details = session.customer_details;
    const ship = (session as any).shipping_details || (session as any).collected_information?.shipping_details;
    const addr = ship?.address;
    const itemsText = lineItems.data
      .map((li) => `${li.quantity} x ${li.description} ($${((li.amount_total || 0) / 100).toFixed(2)})`)
      .join('\n');

    await sendLeadNotificationEmail({
      type: 'PRODUCT_ORDER',
      name: details?.name || ship?.name || undefined,
      phone: details?.phone || undefined,
      email: details?.email || session.customer_email || undefined,
      productName: fulfilment === 'collect' ? 'CLICK & COLLECT order' : 'DELIVERY order',
      quantity: String(lineItems.data.reduce((n, li) => n + (li.quantity || 0), 0)),
      deliveryAddress: addr
        ? [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code, addr.country].filter(Boolean).join(', ')
        : fulfilment === 'collect'
          ? 'Collecting from the kiosk'
          : undefined,
      message: `${itemsText}\n\nPaid: $${((session.amount_total || 0) / 100).toFixed(2)} AUD${
        Number(session.metadata?.bundleSaving || 0) > 0 ? ` (bundle saving $${session.metadata?.bundleSaving})` : ''
      }\nStripe session: ${session.id}`,
    });
  } catch (error) {
    console.error('Error handling checkout session completed:', error);
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment intent succeeded:', paymentIntent.id);
    
    // Handle successful payment intent
    // This is called when the payment is successfully processed
    
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment intent failed:', paymentIntent.id);
    
    // Handle failed payment intent
    // You might want to:
    // 1. Log the failure
    // 2. Send notification to customer
    // 3. Update order status
    
  } catch (error) {
    console.error('Error handling payment intent failed:', error);
  }
}

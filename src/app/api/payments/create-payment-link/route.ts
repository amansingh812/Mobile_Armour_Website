import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { items, customerEmail, totalAmount, customerName, orderId } = await request.json();

    // Create Stripe Checkout Session (Payment Link)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'aud',
          product_data: {
            name: item.name,
            images: item.imageUrl ? [item.imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/cancelled`,
      customer_email: customerEmail,
      metadata: {
        orderId: orderId || `ord_${Date.now()}`,
        customerName: customerName || '',
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['AU', 'US', 'CA', 'GB'], // Add countries as needed
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    });
  } catch (error: any) {
    console.error('Error creating payment link:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment link' },
      { status: 500 }
    );
  }
}

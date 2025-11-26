import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { amount, customerEmail, customerName, description } = await request.json();

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session for advance payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: description || 'Advance Payment - Mobile Repair',
              description: customerName ? `Advance payment for ${customerName}` : 'Advance payment for mobile repair service',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}&type=advance`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/cancelled`,
      customer_email: customerEmail || undefined,
      metadata: {
        paymentType: 'advance',
        customerName: customerName || '',
        description: description || '',
        amount: amount.toString(),
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
    console.error('Error creating advance payment link:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create advance payment link' },
      { status: 500 }
    );
  }
}

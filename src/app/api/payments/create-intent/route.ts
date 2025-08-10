import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
    console.warn('STRIPE_SECRET_KEY is not set. Apple Pay/Stripe will not work.');
}

const stripe = new Stripe(stripeSecret || '', { apiVersion: '2024-06-20' as any });

export async function POST(req: NextRequest) {
    try {
        if (!stripeSecret) {
            return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
        }

        const { amount, currency = 'usd', metadata } = await req.json();

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }

        const intent = await stripe.paymentIntents.create({
            amount, // smallest currency unit (e.g., paise)
            currency,
            automatic_payment_methods: { enabled: true },
            metadata,
        });
        return NextResponse.json({ clientSecret: intent.client_secret });
    } catch (e: any) {
        console.error('Create intent error:', e);
        return NextResponse.json({ error: e.message || 'Failed to create payment intent' }, { status: 500 });
    }
}

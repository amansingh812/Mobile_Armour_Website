'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentRequestButtonElement,
    useStripe,
} from '@stripe/react-stripe-js';
import type {
    PaymentRequest,
    PaymentRequestPaymentMethodEvent,
    CanMakePaymentResult,
} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = {
    amount: number; // in paise
    currency?: string;
    country?: string; // ISO 2-letter merchant country, e.g., 'US', 'AU'
    onSuccess: (paymentIntentId: string) => void;
    onError?: (message: string) => void;
};

function InnerApplePayButton({ amount, currency = 'usd', country = 'US', onSuccess, onError }: Props) {
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!stripe) return;

        const pr = stripe.paymentRequest({
            country,
            currency,
            total: { label: 'Order Total', amount },
            requestPayerName: true,
            requestPayerEmail: true,
            requestPayerPhone: true,
            requestShipping: false,
        });

        pr.canMakePayment().then((result: CanMakePaymentResult | null) => {
            if (result) {
                setPaymentRequest(pr);
                setReady(true);
            } else {
                setReady(false);
            }
        });
    }, [stripe, amount, currency, country]);

    useEffect(() => {
        if (!paymentRequest || !stripe) return;

        paymentRequest.on('paymentmethod', async (ev: PaymentRequestPaymentMethodEvent) => {
            try {
                const res = await fetch('/api/payments/create-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount, currency }),
                });
                const { clientSecret, error } = await res.json();
                if (error || !clientSecret) {
                    ev.complete('fail');
                    onError?.(error || 'Failed to create payment intent');
                    return;
                }

                const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: ev.paymentMethod.id,
                }, { handleActions: false });

                if (confirmError) {
                    ev.complete('fail');
                    onError?.(confirmError.message || 'Payment failed');
                    return;
                }

                if (paymentIntent && paymentIntent.status === 'requires_action') {
                    const { error: actionError, paymentIntent: updatedPI } = await stripe.confirmCardPayment(clientSecret);
                    if (actionError || !updatedPI || updatedPI.status !== 'succeeded') {
                        ev.complete('fail');
                        onError?.(actionError?.message || 'Payment not completed');
                        return;
                    }
                    ev.complete('success');
                    onSuccess(updatedPI.id);
                } else {
                    ev.complete('success');
                    onSuccess(paymentIntent!.id);
                }
            } catch (err: any) {
                ev.complete('fail');
                onError?.(err.message || 'Payment failed');
            }
        });
    }, [paymentRequest, amount, currency, onSuccess, onError, stripe]);

    if (!ready || !paymentRequest) {
        return (
            <div style={{
                marginTop: '8px',
                padding: '12px',
                borderRadius: 8,
                background: '#fff3cd',
                color: '#856404',
                fontSize: 14,
            }}>
                Apple Pay isn’t available on this browser/device or domain isn’t verified. Try Safari with Apple Wallet, or choose another payment method.
            </div>
        );
    }

    return (
        <PaymentRequestButtonElement
            options={{
                paymentRequest,
                style: { paymentRequestButton: { theme: 'dark', height: '48px', type: 'buy' } },
            }}
        />
    );
}

export default function ApplePayButton(props: Props) {
    return (
        <Elements stripe={stripePromise}>
            <InnerApplePayButton {...props} />
        </Elements>
    );
}

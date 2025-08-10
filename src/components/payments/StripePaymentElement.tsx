"use client";

import React, { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export type StripePaymentElementProps = {
  amount: number; // in minor units
  currency?: string; // e.g. 'usd', 'aud'
  onSuccess: (paymentIntentId: string) => Promise<void> | void;
  onError?: (message: string) => void;
  email?: string;
  name?: string;
};

function InnerForm({ onSuccess, onError, email, name }: Pick<StripePaymentElementProps, "onSuccess" | "onError" | "email" | "name">) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          receipt_email: email,
          payment_method_data: {
            billing_details: {
              email: email,
              name: name,
            },
          },
          // return_url can be added for redirect-based flows if needed
        },
        redirect: "if_required",
      });

      if (error) {
        onError?.(error.message || "Payment failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        await onSuccess(paymentIntent.id);
      } else if (paymentIntent && paymentIntent.status === "requires_action") {
        // If 3DS or similar was required and handled automatically, try again result via retrieve
        onError?.("Additional action required. Please try again.");
      } else {
        onError?.("Payment not completed.");
      }
    } catch (err: any) {
      onError?.(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ margin: "12px 0" }}>
        <PaymentElement options={{ layout: "tabs" }} />
      </div>
      <button type="submit" className="place-order-btn" disabled={!stripe || !elements || loading}>
        {loading ? "Processing..." : "Pay & Place Order"}
      </button>
    </form>
  );
}

export default function StripePaymentElement({ amount, currency = "usd", onSuccess, onError, email, name }: StripePaymentElementProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createIntent = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/payments/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, currency }),
        });
        const data = await res.json();
        if (!res.ok || !data.clientSecret) {
          throw new Error(data.error || "Failed to create payment intent");
        }
        setClientSecret(data.clientSecret);
      } catch (err: any) {
        onError?.(err.message || "Failed initializing payment");
      } finally {
        setLoading(false);
      }
    };
    createIntent();
  }, [amount, currency, onError]);

  const options = useMemo(() => (
    clientSecret ? { clientSecret, appearance: { theme: "stripe" } as const } : undefined
  ), [clientSecret]);

  if (loading && !clientSecret) {
    return <div>Preparing payment...</div>;
  }

  if (!options) {
    return null;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <InnerForm onSuccess={onSuccess} onError={onError} email={email} name={name} />
    </Elements>
  );
}

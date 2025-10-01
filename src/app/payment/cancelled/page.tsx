'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PaymentCancelled() {
  const router = useRouter();

  useEffect(() => {
    // Clean up any pending order data since payment was cancelled
    localStorage.removeItem('pendingOrder');
  }, []);

  return (
    <div className="payment-cancelled-page">
      <div className="cancelled-container">
        <div className="cancelled-content">
          <div className="cancelled-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="cancelled-title">
            Payment Cancelled
          </h1>

          <p className="cancelled-message">
            Your payment was cancelled. No charges were made to your account.
          </p>

          <p className="cancelled-note">
            Your items are still in your cart and you can complete your purchase at any time.
          </p>

          <div className="cancelled-actions">
            <button
              onClick={() => router.back()}
              className="primary-action-btn"
            >
              ← Return to Checkout
            </button>

            <div className="secondary-actions">
              <Link href="/cart" className="secondary-btn">
                View Cart
              </Link>
              <Link href="/products" className="secondary-btn">
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="help-text">
            Need help? <Link href="/contact" className="help-link">Contact our support team</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

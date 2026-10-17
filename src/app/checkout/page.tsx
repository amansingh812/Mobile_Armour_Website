'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Checkout now starts from the cart (choose collect or delivery, then pay on
// Stripe's secure page, which collects contact and delivery details).
export default function CheckoutPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/cart');
  }, [router]);
  return (
    <main style={{ padding: '80px 24px', textAlign: 'center' }}>
      <p>
        Taking you to your cart… <a href="/cart">Go to cart</a>
      </p>
    </main>
  );
}

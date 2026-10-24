'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { BUSINESS, fullAddress } from '@/data/business';
import { STORE } from '@/data/store-settings';
import '@/components/site/page.css';
import '@/components/store/store.css';
import '@/app/cart/cart-page.css';

interface PendingOrder {
  sessionId: string;
  fulfilment?: 'collect' | 'delivery';
  items: { product: { _id: string; name: string; imageUrl: string }; quantity: number }[];
  total: number;
}

function PaymentSuccess() {
  const params = useSearchParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<PendingOrder | null>(null);

  useEffect(() => {
    const sessionId = params.get('session_id');
    try {
      const raw = localStorage.getItem('pendingOrder');
      const o = raw ? (JSON.parse(raw) as PendingOrder) : null;
      if (o && sessionId && o.sessionId === sessionId) {
        setOrder(o);
        localStorage.removeItem('pendingOrder');
      }
    } catch {}
    if (sessionId) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const collect = (order?.fulfilment || 'collect') === 'collect';

  return (
    <main className="ma-page ma-cart">
      <div className="ma-wrap" style={{ maxWidth: 760, paddingTop: 48 }}>
        <div className="ma-cart__box" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="ma-toast__tick" aria-hidden="true" style={{ width: 56, height: 56, fontSize: 26 }}>
            ✓
          </span>
          <h1 className="ma-h1" style={{ fontSize: 34 }}>
            Thanks, your order is paid
          </h1>
          {collect ? (
            <p style={{ fontSize: 17 }}>
              We&apos;ll text you when it&apos;s ready to collect from <strong>{fullAddress}</strong> (
              {STORE.clickAndCollect.readyText}).{' '}
              {STORE.freeFitting ? 'Bring your phone and we’ll fit any screen protector for you.' : ''}
            </p>
          ) : (
            <p style={{ fontSize: 17 }}>
              We&apos;ll pack it and send it by {STORE.delivery.carrier}; you&apos;ll get an email when it&apos;s on its
              way.
            </p>
          )}
          <p style={{ color: 'var(--ma-body)' }}>A receipt has been emailed to you by Stripe.</p>

          {order && order.items.length > 0 && (
            <ul className="ma-cart__items" aria-label="Items in this order">
              {order.items.map((i) => (
                <li key={i.product._id} className="ma-cart__item" style={{ gridTemplateColumns: '64px 1fr auto' }}>
                  <span className="ma-cart__thumb" style={{ width: 64, height: 64 }}>
                    {i.product.imageUrl && <Image src={i.product.imageUrl} alt="" fill sizes="64px" />}
                  </span>
                  <span className="ma-cart__name">{i.product.name}</span>
                  <span>× {i.quantity}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="ma-actions">
            <Link href="/products" className="ma-btn ma-btn--primary">
              Keep shopping
            </Link>
            <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--outline">
              Questions? Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<main className="ma-page" style={{ padding: 80, textAlign: 'center' }}>Loading…</main>}>
      <PaymentSuccess />
    </Suspense>
  );
}

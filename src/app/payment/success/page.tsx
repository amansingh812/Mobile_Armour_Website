'use client';

import { Suspense, useEffect, useState } from 'react';
import { lineKey } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { BUSINESS, fullAddress } from '@/data/business';
import { STORE } from '@/data/store-settings';
import '@/components/site/page.css';
import '@/components/store/store.css';
import '@/app/cart/cart-page.css';
import { track } from '@/lib/analytics';

interface PendingOrder {
  sessionId: string;
  fulfilment?: 'collect' | 'delivery';
  items: { product: { _id: string; name: string; imageUrl: string; variantSku?: string; variantLabel?: string; model?: string }; quantity: number }[];
  total: number;
}

interface SavedOrder {
  orderNumber: string;
  fulfilment: 'collect' | 'delivery';
  total: number;
  shipping: number;
  items: { name: string; quantity: number; unitPrice: number; image?: string; sku?: string; productId?: string; orderIn?: boolean }[];
}

function PaymentSuccess() {
  const params = useSearchParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [saved, setSaved] = useState<SavedOrder | null>(null);

  // The saved order (order number) from our server. Stripe's webhook usually
  // lands within a second or two; ask a few times before giving up quietly.
  useEffect(() => {
    const sessionId = params.get('session_id');
    if (!sessionId) return;
    let stop = false;
    (async () => {
      for (let attempt = 0; attempt < 6 && !stop; attempt++) {
        try {
          const r = await fetch(`/api/orders?session_id=${encodeURIComponent(sessionId)}`, { cache: 'no-store' });
          if (r.ok) {
            const o = (await r.json()) as SavedOrder;
            if (stop) return;
            setSaved(o);
            // GA4 purchase, once per order (refreshing the page doesn't count it again).
            const key = `ma-ga-purchase-${o.orderNumber}`;
            let seen = false;
            try {
              seen = !!localStorage.getItem(key);
              localStorage.setItem(key, '1');
            } catch {}
            if (!seen) {
              track('purchase', {
                transaction_id: o.orderNumber,
                value: o.total,
                shipping: o.shipping,
                items: o.items.map((i) => ({
                  item_id: i.sku || i.productId || i.name,
                  item_name: i.name,
                  price: i.unitPrice,
                  quantity: i.quantity,
                })),
              });
            }
            return;
          }
          if (r.status !== 202) return;
        } catch {}
        await new Promise((res) => setTimeout(res, 1500));
      }
    })();
    return () => {
      stop = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const collect = (saved?.fulfilment || order?.fulfilment || 'collect') === 'collect';
  const anyOrderIn = !!saved?.items.some((i) => i.orderIn);

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
          {saved && (
            <p style={{ fontSize: 17, margin: 0 }}>
              Order number <strong>{saved.orderNumber}</strong>
            </p>
          )}
          {collect ? (
            <p style={{ fontSize: 17 }}>
              We&apos;ll text you when it&apos;s ready to collect from <strong>{fullAddress}</strong> (
              {anyOrderIn ? `some items are ordered in for you, ${STORE.orderIn.readyText}` : STORE.clickAndCollect.readyText}).{' '}
              {STORE.freeFitting ? 'Bring your phone and we’ll fit any screen protector for you.' : ''}
            </p>
          ) : (
            <p style={{ fontSize: 17 }}>
              We&apos;ll pack it and send it by {STORE.delivery.carrier}; you&apos;ll get an email when it&apos;s on its
              way.
            </p>
          )}
          <p style={{ color: 'var(--ma-body)' }}>We&apos;ve emailed you a confirmation{saved ? ` for order ${saved.orderNumber}` : ''}.</p>

          {order && order.items.length > 0 && (
            <ul className="ma-cart__items" aria-label="Items in this order">
              {order.items.map((i) => (
                <li key={lineKey(i.product)} className="ma-cart__item" style={{ gridTemplateColumns: '64px 1fr auto' }}>
                  <span className="ma-cart__thumb" style={{ width: 64, height: 64 }}>
                    {i.product.imageUrl && <Image src={i.product.imageUrl} alt="" fill sizes="64px" />}
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span className="ma-cart__name">{i.product.name}</span>
                    {i.product.variantLabel && <span className="ma-cart__fit">{i.product.variantLabel}</span>}
                  </span>
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

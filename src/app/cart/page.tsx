'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { priceCart, money, type Fulfilment, type PricedItem } from '@/lib/pricing';
import { productPath, currentPrice } from '@/lib/products';
import { STORE, deliveryFeeText } from '@/data/store-settings';
import { BUSINESS, fullAddress } from '@/data/business';
import '@/components/site/page.css';
import '@/components/store/store.css';
import './cart.css';

const FULFIL_KEY = 'ma-fulfilment';

export default function CartPage() {
  const { state, updateQuantity, removeItem } = useCart();
  const [fulfilment, setFulfilment] = useState<Fulfilment>(STORE.clickAndCollect.enabled ? 'collect' : 'delivery');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const f = localStorage.getItem(FULFIL_KEY);
      if (f === 'collect' || f === 'delivery') setFulfilment(f);
    } catch {}
  }, []);
  const choose = (f: Fulfilment) => {
    setFulfilment(f);
    try {
      localStorage.setItem(FULFIL_KEY, f);
    } catch {}
  };

  const priced: PricedItem[] = useMemo(
    () =>
      state.items.map((i) => ({
        id: i.product._id,
        name: i.product.name,
        unitPrice: currentPrice(i.product),
        quantity: i.quantity,
        category: i.product.category,
        devices: i.product.deviceCompatibility || [],
      })),
    [state.items]
  );
  const totals = priceCart(priced, fulfilment);
  const bundledIds = new Set(totals.bundles.flatMap((b) => [b.caseId, b.protectorId]));

  // Suggest completing a bundle: a case with no matching glass, or glass with no case.
  const upsell = useMemo(() => {
    if (!STORE.bundle.enabled) return null;
    for (const i of priced) {
      if (bundledIds.has(i.id) || !i.devices.length) continue;
      if (i.category === 'Cases') return { device: i.devices[0], need: 'screen protector' };
      if (i.category === 'Screen Protectors') return { device: i.devices[0], need: 'case' };
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priced, totals.bundles.length]);

  const pay = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/payments/create-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fulfilment,
          items: state.items.map((i) => ({ id: i.product._id, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
      try {
        localStorage.setItem(
          'pendingOrder',
          JSON.stringify({
            sessionId: data.sessionId,
            fulfilment,
            items: state.items,
            total: data.totals?.total ?? totals.total,
            createdAt: new Date().toISOString(),
          })
        );
      } catch {}
      window.location.href = data.url;
    } catch (e: any) {
      setError(e.message || 'Checkout failed');
      setBusy(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <main className="ma-page">
        <div className="ma-wrap ma-cart-empty">
          <h1 className="ma-h1">Your cart is empty</h1>
          <p>Cases, screen protectors and chargers for your phone, ready to collect at Warringal or delivered.</p>
          <div className="ma-actions">
            <Link href="/products" className="ma-btn ma-btn--primary">
              Shop accessories
            </Link>
            <Link href="/bundle" className="ma-btn ma-btn--outline">
              Build a protection bundle
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="ma-page ma-cart">
      <div className="ma-wrap">
        <h1 className="ma-h1" style={{ fontSize: 36, padding: '28px 0 20px' }}>
          Your cart
        </h1>
        <div className="ma-cart__layout">
          <div className="ma-cart__main">
            <section aria-label="Items" className="ma-cart__box">
              <ul className="ma-cart__items">
                {state.items.map((item) => {
                  const p = item.product;
                  const unit = currentPrice(p);
                  return (
                    <li key={p._id} className="ma-cart__item">
                      <Link href={productPath(p)} className="ma-cart__thumb">
                        {p.imageUrl && <Image src={p.imageUrl} alt="" fill sizes="88px" />}
                      </Link>
                      <div className="ma-cart__info">
                        <Link href={productPath(p)} className="ma-cart__name">
                          {p.name}
                        </Link>
                        {p.deviceCompatibility?.length ? (
                          <span className="ma-cart__fit">✓ Fits {p.deviceCompatibility.slice(0, 2).join(', ')}</span>
                        ) : null}
                        {bundledIds.has(p._id) && (
                          <span className="ma-cart__bundle">
                            {STORE.bundle.label}: {STORE.bundle.discountPercent}% off
                          </span>
                        )}
                        <button type="button" className="ma-cart__remove" onClick={() => removeItem(p._id)}>
                          Remove
                        </button>
                      </div>
                      <div className="ma-qty" role="group" aria-label={`Quantity of ${p.name}`}>
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => (item.quantity <= 1 ? removeItem(p._id) : updateQuantity(p._id, item.quantity - 1))}
                        >
                          −
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(p._id, Math.min(20, item.quantity + 1))}
                        >
                          +
                        </button>
                      </div>
                      <strong className="ma-cart__line">{money(unit * item.quantity)}</strong>
                    </li>
                  );
                })}
              </ul>
              {upsell && (
                <div className="ma-cart__upsell">
                  <div>
                    <strong>
                      Add a {upsell.need} for your {upsell.device} and save {STORE.bundle.discountPercent}% on both
                    </strong>
                    <span>
                      {STORE.bundle.label} discount applies automatically
                      {STORE.freeFitting ? '; glass fitted free at the kiosk' : ''}.
                    </span>
                  </div>
                  <Link href={`/bundle?device=${encodeURIComponent(upsell.device)}`} className="ma-btn ma-btn--dark">
                    Complete the bundle
                  </Link>
                </div>
              )}
            </section>

            <section aria-labelledby="how" className="ma-cart__box">
              <h2 id="how" className="ma-cart__h2">
                How do you want it?
              </h2>
              <div className="ma-fulfil" role="radiogroup" aria-labelledby="how">
                {STORE.clickAndCollect.enabled && (
                  <label className={`ma-fulfil__opt${fulfilment === 'collect' ? ' is-on' : ''}`}>
                    <input
                      type="radio"
                      name="fulfilment"
                      className="ma-sr"
                      checked={fulfilment === 'collect'}
                      onChange={() => choose('collect')}
                    />
                    <span className="ma-fulfil__top">
                      <strong>Click & collect at Warringal</strong>
                      <span className="ma-fulfil__badge is-free">FREE</span>
                    </span>
                    <span className="ma-fulfil__sub">
                      Pick up at {BUSINESS.address.unit}, {STORE.clickAndCollect.readyText}.
                      {STORE.freeFitting ? ' We check the fit and fit your glass while you wait.' : ''}
                    </span>
                  </label>
                )}
                {STORE.delivery.enabled && (
                  <label className={`ma-fulfil__opt${fulfilment === 'delivery' ? ' is-on' : ''}`}>
                    <input
                      type="radio"
                      name="fulfilment"
                      className="ma-sr"
                      checked={fulfilment === 'delivery'}
                      onChange={() => choose('delivery')}
                    />
                    <span className="ma-fulfil__top">
                      <strong>Delivery</strong>
                      <span className={`ma-fulfil__badge${STORE.delivery.fee === 0 ? ' is-free' : ''}`}>
                        {deliveryFeeText()}
                      </span>
                    </span>
                    <span className="ma-fulfil__sub">
                      {STORE.delivery.carrier}, {STORE.delivery.timeText}. Returns can still be dropped at the kiosk.
                    </span>
                  </label>
                )}
              </div>
              {fulfilment === 'collect' ? (
                <p className="ma-fulfil__note">
                  <strong>Collect from:</strong> {fullAddress}. We&apos;ll text you when your order is ready.
                </p>
              ) : (
                <p className="ma-fulfil__note">You&apos;ll enter your delivery address on the secure payment page.</p>
              )}
            </section>
          </div>

          <aside className="ma-cart__summary" aria-label="Order summary">
            <h2 className="ma-cart__h2">Order summary</h2>
            <dl>
              <div>
                <dt>Items</dt>
                <dd>{money(totals.subtotal)}</dd>
              </div>
              {totals.bundleSaving > 0 && (
                <div className="is-saving">
                  <dt>
                    {STORE.bundle.label} ({totals.bundles.length}× {STORE.bundle.discountPercent}% off)
                  </dt>
                  <dd>−{money(totals.bundleSaving)}</dd>
                </div>
              )}
              <div>
                <dt>{fulfilment === 'collect' ? 'Click & collect' : 'Delivery'}</dt>
                <dd className={totals.shipping === 0 ? 'is-free' : undefined}>
                  {totals.shipping === 0 ? 'Free' : money(totals.shipping)}
                </dd>
              </div>
              <div className="is-total">
                <dt>Total (incl. GST)</dt>
                <dd>{money(totals.total)}</dd>
              </div>
            </dl>
            {error && (
              <p className="ma-cart__error" role="alert">
                {error}
              </p>
            )}
            <button type="button" className="ma-btn ma-btn--primary ma-add-full" onClick={pay} disabled={busy}>
              {busy ? 'Opening secure checkout…' : fulfilment === 'collect' ? 'Pay and collect' : 'Pay and get it delivered'}
            </button>
            <p className="ma-cart__secure">Secure payment by Stripe: card, Apple Pay, Google Pay</p>
            <ul className="ma-cart__promises">
              {STORE.fitGuarantee && (
                <li>
                  ✓ <strong>Fit guarantee</strong>: wrong model? Swap it the same day
                </li>
              )}
              {STORE.returns.walkIn && (
                <li>
                  ✓ <strong>Walk-in returns</strong> at the kiosk, no posting back
                </li>
              )}
              <li>
                ✓ Questions? Call <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
              </li>
            </ul>
            <Link href="/delivery-returns" className="ma-link" style={{ fontSize: 14 }}>
              Delivery, collection and returns →
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

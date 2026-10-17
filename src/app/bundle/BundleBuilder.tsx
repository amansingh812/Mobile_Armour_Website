'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { toCartProduct, announceAdded } from '@/components/store/AddToCartButton';
import { currentPrice, productPath } from '@/lib/products';
import { priceCart, money } from '@/lib/pricing';
import { STORE } from '@/data/store-settings';
import type { ShopProduct } from '@/lib/shop-data';

interface Props {
  devices: string[];
  cases: ShopProduct[];
  protectors: ShopProduct[];
  extras: ShopProduct[];
}

const fits = (p: ShopProduct, device: string) => (p.deviceCompatibility || []).includes(device);
const fmt = (n: number) => (n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`);

function Option({ p, on, onPick, type }: { p: ShopProduct; on: boolean; onPick: () => void; type: 'radio' | 'checkbox' }) {
  const out = typeof p.stock === 'number' && p.stock <= 0;
  return (
    <label className={`ma-bopt${on ? ' is-on' : ''}${out ? ' is-out' : ''}`}>
      <input type={type} className="ma-sr" checked={on} onChange={onPick} disabled={out} name={type === 'radio' ? p.category : undefined} />
      <span className="ma-bopt__img">{p.imageUrl && <Image src={p.imageUrl} alt="" fill sizes="200px" />}</span>
      <span className="ma-bopt__name">{p.name}</span>
      <span className="ma-bopt__price">{out ? 'Out of stock' : fmt(currentPrice(p))}</span>
    </label>
  );
}

export default function BundleBuilder({ devices, cases, protectors, extras }: Props) {
  const { addItem } = useCart();
  const [device, setDevice] = useState(devices[0] || '');
  const [caseId, setCaseId] = useState<string | null>(null);
  const [glassId, setGlassId] = useState<string | null>(null);
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get('device');
    if (d && devices.includes(d)) setDevice(d);
  }, [devices]);

  const caseList = useMemo(() => cases.filter((p) => fits(p, device)), [cases, device]);
  const glassList = useMemo(() => protectors.filter((p) => fits(p, device)), [protectors, device]);

  // Pick the first in-stock option by default whenever the phone changes.
  useEffect(() => {
    const firstIn = (l: ShopProduct[]) => l.find((p) => !(typeof p.stock === 'number' && p.stock <= 0))?._id || null;
    setCaseId(firstIn(caseList));
    setGlassId(firstIn(glassList));
    setAdded(false);
  }, [caseList, glassList]);

  const chosen = [
    caseList.find((p) => p._id === caseId),
    glassList.find((p) => p._id === glassId),
    ...extras.filter((p) => extraIds.includes(p._id)),
  ].filter(Boolean) as ShopProduct[];

  const totals = priceCart(
    chosen.map((p) => ({
      id: p._id,
      name: p.name,
      unitPrice: currentPrice(p),
      quantity: 1,
      category: p.category,
      devices: p.deviceCompatibility || [],
    })),
    'collect'
  );

  const addAll = () => {
    for (const p of chosen) addItem(toCartProduct(p), 1);
    announceAdded('bundle', chosen.length);
    setAdded(true);
  };

  if (!devices.length) {
    return (
      <p className="ma-panel ma-panel--line">
        Bundles are being restocked. <Link href="/products">Browse all accessories</Link>.
      </p>
    );
  }

  return (
    <div className="ma-bundle">
      <div className="ma-bundle__steps">
        <section aria-labelledby="b0">
          <h2 id="b0" className="ma-bundle__h">Your phone</h2>
          <div className="ma-chips" role="radiogroup" aria-labelledby="b0">
            {devices.map((d) => (
              <button
                key={d}
                type="button"
                role="radio"
                aria-checked={d === device}
                className={`ma-chip${d === device ? ' is-on' : ''}`}
                onClick={() => setDevice(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="b1">
          <h2 id="b1" className="ma-bundle__h">
            <span className="ma-steps__n">1</span> Pick your case
          </h2>
          <div className="ma-bopts" role="radiogroup" aria-labelledby="b1">
            {caseList.map((p) => (
              <Option key={p._id} p={p} type="radio" on={p._id === caseId} onPick={() => setCaseId(p._id)} />
            ))}
          </div>
        </section>

        <section aria-labelledby="b2">
          <h2 id="b2" className="ma-bundle__h">
            <span className="ma-steps__n">2</span> Pick your screen protection
          </h2>
          <div className="ma-bopts" role="radiogroup" aria-labelledby="b2">
            {glassList.map((p) => (
              <Option key={p._id} p={p} type="radio" on={p._id === glassId} onPick={() => setGlassId(p._id)} />
            ))}
          </div>
        </section>

        {extras.length > 0 && (
          <section aria-labelledby="b3">
            <h2 id="b3" className="ma-bundle__h">
              <span className="ma-steps__n">3</span> Add a charger or cable <span className="ma-bundle__opt">(optional)</span>
            </h2>
            <div className="ma-bopts">
              {extras.map((p) => (
                <Option
                  key={p._id}
                  p={p}
                  type="checkbox"
                  on={extraIds.includes(p._id)}
                  onPick={() => setExtraIds((s) => (s.includes(p._id) ? s.filter((x) => x !== p._id) : [...s, p._id]))}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <aside className="ma-bundle__sum" aria-label="Your bundle">
        <h2 className="ma-bundle__h" style={{ margin: 0 }}>
          Your bundle
        </h2>
        <ul>
          {chosen.map((p) => (
            <li key={p._id}>
              <Link href={productPath(p)}>{p.name}</Link>
              <strong>{fmt(currentPrice(p))}</strong>
            </li>
          ))}
          {STORE.freeFitting && glassId && (
            <li className="is-good">
              <span>Glass fitting at the kiosk</span>
              <strong>Free</strong>
            </li>
          )}
          {totals.bundleSaving > 0 && (
            <li className="is-good">
              <span>
                {STORE.bundle.label} ({STORE.bundle.discountPercent}% off)
              </span>
              <strong>−{money(totals.bundleSaving)}</strong>
            </li>
          )}
        </ul>
        <div className="ma-bundle__total">
          <span>Total</span>
          <span>
            {totals.bundleSaving > 0 && <s>{money(totals.subtotal)}</s>}
            <strong>{money(totals.total)}</strong>
          </span>
        </div>
        <button type="button" className="ma-btn ma-btn--primary ma-add-full" onClick={addAll} disabled={chosen.length === 0}>
          {added ? 'Added to cart ✓' : 'Add bundle to cart'}
        </button>
        {added && (
          <Link href="/cart" className="ma-btn ma-btn--outline" style={{ width: '100%' }}>
            Go to cart
          </Link>
        )}
        <ul className="ma-bundle__notes">
          {STORE.fitGuarantee && <li>✓ Fit guarantee: wrong model? Swap it same day</li>}
          {STORE.clickAndCollect.enabled && <li>✓ Click & collect at Warringal, glass fitted while you wait</li>}
          {STORE.returns.walkIn && <li>✓ Walk-in returns, no posting back</li>}
        </ul>
      </aside>
    </div>
  );
}

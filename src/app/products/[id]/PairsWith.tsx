'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { announceAdded, toCartProduct } from '@/components/store/AddToCartButton';
import { currentPrice, productPath } from '@/lib/products';
import type { ShopProduct } from '@/lib/shop-data';

const fmt = (n: number) => (n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`);

/** "Pairs well with": tick the add-ons you want and add them in one go. */
export default function PairsWith({ items }: { items: ShopProduct[] }) {
  const { addItem } = useCart();
  const [picked, setPicked] = useState<Set<string>>(() => new Set(items.map((i) => i._id)));
  const [done, setDone] = useState(false);
  if (!items.length) return null;

  const chosen = items.filter((i) => picked.has(i._id));
  const total = chosen.reduce((s, i) => s + currentPrice(i), 0);
  const toggle = (id: string) =>
    setPicked((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const addAll = () => {
    chosen.forEach((i) => addItem(toCartProduct(i), 1));
    announceAdded(chosen.length === 1 ? chosen[0].name : `${chosen.length} add-ons`, chosen.length);
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  return (
    <section className="ma-pairs" aria-labelledby="pairs-h">
      <h2 id="pairs-h">Pairs well with</h2>
      <ul className="ma-pairs__list">
        {items.map((i) => (
          <li key={i._id} className={`ma-pairs__row${picked.has(i._id) ? ' is-on' : ''}`}>
            <input
              type="checkbox"
              checked={picked.has(i._id)}
              onChange={() => toggle(i._id)}
              aria-label={`Include ${i.name}`}
            />
            <Link href={productPath(i)} className="ma-pairs__img">
              <Image src={i.imageUrl} alt="" fill sizes="56px" />
            </Link>
            <Link href={productPath(i)} className="ma-pairs__name">
              {i.name}
            </Link>
            <span className="ma-pairs__price">{fmt(currentPrice(i))}</span>
          </li>
        ))}
      </ul>
      <button type="button" className="ma-btn ma-btn--dark ma-pairs__add" onClick={addAll} disabled={!chosen.length}>
        {done
          ? 'Added to cart ✓'
          : chosen.length
            ? `Add ${chosen.length === items.length && items.length > 1 ? 'all ' : ''}${chosen.length} to cart · ${fmt(total)}`
            : 'Tick an add-on'}
      </button>
    </section>
  );
}

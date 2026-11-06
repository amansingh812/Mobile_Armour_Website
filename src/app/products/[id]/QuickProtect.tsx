'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { announceAdded, toCartProduct, type CartProduct } from '@/components/store/AddToCartButton';
import { currentPrice, productPath, slugify } from '@/lib/products';
import { glassPairDevice, isCameraGuard } from '@/lib/pricing';
import { STORE } from '@/data/store-settings';
import type { ShopProduct } from '@/lib/shop-data';

const fmt = (n: number) => (n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`);

interface Pick {
  key: string;
  href: string;
  name: string;
  image: string;
  price: number;
  camera: boolean;
  cart: CartProduct;
}

/** Resolves a glass product to the option that fits `device`; null if none does. */
function resolve(p: ShopProduct, device: string): Pick | null {
  if (!(p.deviceCompatibility || []).includes(device)) return null;
  const camera = isCameraGuard(p.category, p.name);
  const href = p.variants ? `${productPath(p)}?model=${slugify(device)}` : productPath(p);
  if (p.variants?.length) {
    const v = p.variants.find((x) => x.available && x.models.includes(device));
    if (!v) return null;
    const label = [device, v.colour].filter(Boolean).join(' · ');
    return {
      key: `${p._id}:${v.sku}`,
      href,
      name: p.name,
      image: v.images[0] || p.imageUrl,
      price: v.price,
      camera,
      cart: {
        _id: p._id,
        name: p.name,
        category: p.category,
        imageUrl: v.images[0] || p.imageUrl,
        price: v.price,
        oldPrice: v.oldPrice,
        deviceCompatibility: [device],
        variantSku: v.sku,
        variantLabel: label,
        model: device,
      },
    };
  }
  if (typeof p.stock === 'number' && p.stock <= 0 && p.fulfilment !== 'order-in') return null;
  return {
    key: p._id,
    href,
    name: p.name,
    image: p.imageUrl,
    price: currentPrice(p),
    camera,
    cart: {
      _id: p._id,
      name: p.name,
      category: p.category,
      imageUrl: p.imageUrl,
      price: p.price,
      newPrice: p.newPrice,
      oldPrice: p.oldPrice,
      deviceCompatibility: p.deviceCompatibility,
    },
  };
}

/**
 * "Quickly add protection": screen protectors and camera lens guards for the
 * phone picked on this page, each with a one-tap + that adds it to the cart.
 */
export default function QuickProtect({
  items,
  device,
  excludeId,
  mode,
}: {
  items: ShopProduct[];
  device?: string;
  excludeId: string;
  /** case: screens + cameras; screen: cameras only; camera: screens only. */
  mode: 'case' | 'screen' | 'camera';
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState<Record<string, boolean>>({});
  if (!device) return null;

  const all = items
    .filter((p) => p._id !== excludeId)
    .map((p) => resolve(p, device))
    .filter((x): x is Pick => !!x)
    .sort((a, b) => b.price - a.price);
  const screens = all.filter((x) => !x.camera);
  const cams = all.filter((x) => x.camera);
  const list =
    mode === 'case' ? [...screens.slice(0, 2), ...cams.slice(0, 2)] : mode === 'screen' ? cams.slice(0, 3) : screens.slice(0, 3);
  if (!list.length) return null;

  const pair = glassPairDevice([device]);
  const add = (x: Pick) => {
    addItem(toCartProduct(x.cart), 1);
    announceAdded(x.cart.variantLabel ? `${x.name} (${x.cart.variantLabel})` : x.name);
    setAdded((s) => ({ ...s, [x.key]: true }));
  };

  return (
    <section className="ma-qp" aria-labelledby="qp-h">
      <div className="ma-qp__head">
        <h2 id="qp-h">
          {mode === 'case' ? 'Quickly add protection' : mode === 'screen' ? 'Add a camera lens guard' : 'Add a screen protector'}
        </h2>
        <span>For {device}</span>
      </div>
      {pair && (
        <p className="ma-qp__deal">
          <strong>Save {STORE.glassPair.discountPercent}%</strong> on a screen protector + camera lens guard together. Applied
          automatically in your cart.
        </p>
      )}
      <ul className="ma-qp__list">
        {list.map((x) => (
          <li key={x.key} className="ma-qp__item">
            <Link href={x.href} className="ma-qp__img" tabIndex={-1} aria-hidden="true">
              <Image src={x.image} alt="" fill sizes="64px" />
            </Link>
            <div className="ma-qp__body">
              <span className="ma-qp__tag">{x.camera ? 'Camera lens' : 'Screen'}</span>
              <Link href={x.href} className="ma-qp__name">
                {x.name}
              </Link>
              <strong>{fmt(x.price)}</strong>
            </div>
            <button
              type="button"
              className={`ma-qp__add${added[x.key] ? ' is-added' : ''}`}
              onClick={() => add(x)}
              aria-label={added[x.key] ? `${x.name} added. Add another` : `Add ${x.name} to cart`}
            >
              {added[x.key] ? '✓' : '+'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

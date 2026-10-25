'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ProductGallery from './ProductGallery';
import BuyBox from './BuyBox';
import { currentPrice, slugify } from '@/lib/products';
import type { ShopProduct, ShopVariant } from '@/lib/shop-data';
import { isWatchSize, shortModel, sortModels, swatchFor, watchSize } from '@/data/phone-models';
import { STORE } from '@/data/store-settings';
import { BUSINESS } from '@/data/business';
import { phonePath } from '@/lib/device-links';

const fmt = (n: number) => (n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`);
/** The phone a shopper last picked, shared with Shop by phone. */
export const PHONE_KEY = 'ma-phone';

export default function ProductTop({ product: p, hubDevices }: { product: ShopProduct; hubDevices: string[] }) {
  const variants = p.variants;
  const models = useMemo(() => (variants ? sortModels(variants.flatMap((v) => v.models)) : []), [variants]);
  const [model, setModel] = useState<string | undefined>(models[0]);
  const isWatch = models.length > 0 && models.every(isWatchSize);
  const [colour, setColour] = useState<string | undefined>();

  // Preselect the phone from ?model=… or the one picked last time.
  useEffect(() => {
    if (!models.length) return;
    let wanted: string | null = null;
    try {
      wanted = new URLSearchParams(window.location.search).get('model');
      if (!wanted) wanted = localStorage.getItem(PHONE_KEY);
    } catch {}
    const match = wanted && models.find((m) => slugify(m) === wanted || m === wanted);
    if (match) setModel(match);
  }, [models]);

  const forModel: ShopVariant[] = useMemo(
    () => (variants && model ? variants.filter((v) => v.models.includes(model)) : []),
    [variants, model]
  );
  const variant: ShopVariant | undefined =
    forModel.find((v) => v.colour === colour) || forModel.find((v) => v.available) || forModel[0];

  const pickModel = (m: string) => {
    setModel(m);
    try {
      // Remember the phone for other pages (not watch sizes).
      if (!isWatchSize(m)) localStorage.setItem(PHONE_KEY, slugify(m));
      const url = new URL(window.location.href);
      url.searchParams.set('model', slugify(m));
      window.history.replaceState(null, '', url.toString());
    } catch {}
  };

  const orderIn = p.fulfilment === 'order-in';
  const price = variant ? variant.price : currentPrice(p);
  const oldPrice = variant ? variant.oldPrice : p.oldPrice;
  const was = typeof oldPrice === 'number' && oldPrice > price ? oldPrice : null;
  const inStock = variant ? variant.available : typeof p.stock === 'number' ? p.stock > 0 : true;
  const lowStock = !variant && typeof p.stock === 'number' && p.stock > 0 && p.stock <= 3;
  const images = Array.from(
    new Set([...(variant?.images || []), p.imageUrl, ...(p.images || [])].filter(Boolean))
  ) as string[];

  const devices = p.deviceCompatibility || [];
  const fitDevices = model ? [model] : devices;
  const device = fitDevices[0];
  const hubDevice = fitDevices.find((d) => hubDevices.includes(d));
  const isCase = p.category === 'Cases';
  const isGlass = p.category === 'Screen Protectors';
  const bundleable = STORE.bundle.enabled && (isCase || isGlass) && device;

  const label = variant ? [model, variant.colour].filter(Boolean).join(' · ') : undefined;
  const cartProduct = {
    _id: p._id,
    name: p.name,
    category: p.category,
    imageUrl: variant?.images[0] || p.imageUrl,
    price,
    newPrice: undefined,
    oldPrice: oldPrice,
    deviceCompatibility: model ? [model] : p.deviceCompatibility,
    ...(variant ? { variantSku: variant.sku, variantLabel: label, model } : {}),
  };

  const fitText = `✓ Fits ${
    fitDevices.length > 2 ? `${fitDevices.slice(0, 2).join(', ')} +${fitDevices.length - 2}` : fitDevices.join(' & ')
  }`;

  return (
    <div className="ma-wrap ma-product__top">
      <ProductGallery key={variant?.sku || 'one'} images={images} name={label ? `${p.name}, ${label}` : p.name} />

      <div className="ma-product__info">
        {device &&
          (hubDevice ? (
            <Link href={phonePath(hubDevice)} className="ma-product__fit">
              {fitText}
            </Link>
          ) : (
            <span className="ma-product__fit">{fitText}</span>
          ))}
        <h1 className="ma-product__title">{p.name}</h1>
        <div className="ma-product__price">
          <strong>{fmt(price)}</strong>
          {was && (
            <>
              <s>{fmt(was)}</s>
              <span className="ma-product__save">Save {fmt(was - price)}</span>
            </>
          )}
        </div>
        <p className={`ma-product__stock${inStock ? '' : ' is-out'}`}>
          {!inStock
            ? orderIn
              ? '● Out of stock at our supplier'
              : '● Out of stock'
            : orderIn
              ? `● Ordered in for you, ${STORE.orderIn.readyText}`
              : lowStock
                ? `● Only ${p.stock} left`
                : '● In stock at Warringal'}
        </p>

        {models.length > 0 && (
          <fieldset className="ma-pick">
            <legend>
              {isWatch ? 'Your watch size' : 'Your phone'}
              {model ? <span>: {isWatch ? shortModel(model) : model}</span> : null}
            </legend>
            <div className="ma-pick__models" role="radiogroup" aria-label={isWatch ? 'Watch size' : 'Phone model'}>
              {models.map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={m === model}
                  className={`ma-pick__model${m === model ? ' is-on' : ''}`}
                  onClick={() => pickModel(m)}
                >
                  {shortModel(m)}
                </button>
              ))}
            </div>
            {isWatch && model && watchSize(model) && (
              <p className="ma-pick__note">Fits {watchSize(model)!.fits}.</p>
            )}
          </fieldset>
        )}

        {forModel.some((v) => v.colour) && (
          <fieldset className="ma-pick">
            <legend>
              Colour{variant?.colour ? <span>: {variant.colour}</span> : null}
            </legend>
            <div className="ma-pick__colours" role="radiogroup" aria-label="Colour">
              {forModel
                .filter((v) => v.colour)
                .map((v) => (
                  <button
                    key={v.sku}
                    type="button"
                    role="radio"
                    aria-checked={v.sku === variant?.sku}
                    aria-label={`${v.colour}${v.available ? '' : ' (out of stock)'}`}
                    title={`${v.colour}${v.available ? '' : ' (out of stock)'}`}
                    className={`ma-pick__swatch${v.sku === variant?.sku ? ' is-on' : ''}${v.available ? '' : ' is-out'}`}
                    style={{ background: swatchFor(v.colour) }}
                    onClick={() => setColour(v.colour)}
                  />
                ))}
            </div>
          </fieldset>
        )}

        <BuyBox key={variant?.sku || 'one'} product={cartProduct} price={price} inStock={inStock} />

        <ul className="ma-product__promises">
          {STORE.clickAndCollect.enabled && (
            <li>
              <strong>Click & collect</strong> from {BUSINESS.address.unit}, Warringal,{' '}
              {orderIn ? STORE.orderIn.readyText : STORE.clickAndCollect.readyText}
            </li>
          )}
          {STORE.delivery.enabled && (
            <li>
              <strong>
                {STORE.delivery.fee === 0
                  ? 'Free delivery'
                  : STORE.delivery.freeOver !== null
                    ? `Free delivery over $${STORE.delivery.freeOver}`
                    : 'Delivery'}
              </strong>{' '}
              by {STORE.delivery.carrier}, {STORE.delivery.timeText}
            </li>
          )}
          {STORE.fitGuarantee && (
            <li>
              <strong>Fit guarantee</strong>: wrong model? Swap it the same day
            </li>
          )}
          {isGlass && STORE.freeFitting && (
            <li>
              <strong>Fitted free</strong> at the kiosk, bubble-free
            </li>
          )}
        </ul>

        {bundleable && (
          <div className="ma-product__bundle">
            <div>
              <strong>
                Add a {isCase ? 'screen protector' : 'case'} and save {STORE.bundle.discountPercent}% on both
              </strong>
              <span>
                {STORE.bundle.label} for {device}
                {STORE.freeFitting ? ', glass fitted free' : ''}.
              </span>
            </div>
            <Link href={`/bundle?device=${encodeURIComponent(device)}`} className="ma-btn ma-btn--dark">
              Build the bundle
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

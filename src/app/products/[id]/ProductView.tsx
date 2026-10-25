import Link from 'next/link';
import ProductGallery from './ProductGallery';
import BuyBox from './BuyBox';
import PairsWith from './PairsWith';
import ProductTile from '@/components/store/ProductTile';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import { currentPrice } from '@/lib/products';
import type { ShopProduct } from '@/lib/shop-data';
import { getShopCategoryByDb } from '@/data/shop-categories';
import { STORE } from '@/data/store-settings';
import { BUSINESS } from '@/data/business';
import { phonePath, repairLinkFor } from '@/lib/device-links';
import '@/components/site/page.css';
import '@/components/store/store.css';
import './product.css';

const fmt = (n: number) => (n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`);

export default function ProductView({
  product: p,
  addOns,
  alternatives,
  hubDevices = [],
}: {
  product: ShopProduct;
  addOns: ShopProduct[];
  alternatives: ShopProduct[];
  /** Phones that have their own /phones page; others aren't linked. */
  hubDevices?: string[];
}) {
  const price = currentPrice(p);
  const was = typeof p.oldPrice === 'number' && p.oldPrice > price ? p.oldPrice : null;
  const inStock = typeof p.stock === 'number' ? p.stock > 0 : true;
  const orderIn = p.fulfilment === 'order-in';
  const lowStock = typeof p.stock === 'number' && p.stock > 0 && p.stock <= 3;
  const images = Array.from(new Set([p.imageUrl, ...(p.images || [])].filter(Boolean)));
  const cat = getShopCategoryByDb(p.category);
  const devices = p.deviceCompatibility || [];
  const device = devices[0];
  const hubDevice = devices.find((d) => hubDevices.includes(d));
  const isCase = p.category === 'Cases';
  const isGlass = p.category === 'Screen Protectors';
  const bundleable = STORE.bundle.enabled && (isCase || isGlass) && device;
  const repair = device ? repairLinkFor(device) : null;
  const noun = cat ? cat.shortName.toLowerCase().replace(/s$/, '') : 'product';

  const faqs = [
    device && {
      q: `Will this fit my ${device}?`,
      a: `Yes. It's made for ${devices.join(', ')}. ${
        STORE.fitGuarantee ? 'If it doesn\'t fit, bring it back to the kiosk and we\'ll swap it the same day.' : ''
      }`.trim(),
    },
    STORE.clickAndCollect.enabled && {
      q: 'Can I pick it up today?',
      a: `Yes. Choose click & collect at checkout and pick it up from ${BUSINESS.address.unit}, ${BUSINESS.address.centre}, Heidelberg (${orderIn ? STORE.orderIn.readyText : STORE.clickAndCollect.readyText}).`,
    },
    isGlass &&
      STORE.freeFitting && {
        q: 'Will you fit the screen protector for me?',
        a: 'Yes. Bring your phone to the kiosk and we fit it bubble-free for free when you buy it from us.',
      },
    STORE.returns.changeOfMindDays > 0
      ? {
          q: 'What if I change my mind?',
          a: `Bring it back unused within ${STORE.returns.changeOfMindDays} days with your receipt or order email${
            STORE.returns.walkIn ? ', straight to the kiosk' : ''
          }. Faulty items are covered under Australian Consumer Law.`,
        }
      : {
          q: 'Can I return it?',
          a: `We don't offer change-of-mind returns, so please check your model before you buy.${
            STORE.fitGuarantee ? " Bought the wrong model? Bring it back unused and we'll swap it the same day." : ''
          } Faulty items are covered under Australian Consumer Law.`,
        },
  ].filter(Boolean) as { q: string; a: string }[];

  const cartProduct = {
    _id: p._id,
    name: p.name,
    category: p.category,
    imageUrl: p.imageUrl,
    price: p.price,
    newPrice: p.newPrice,
    oldPrice: p.oldPrice,
    deviceCompatibility: p.deviceCompatibility,
  };

  return (
    <main className="ma-page ma-product">
      <JsonLd data={faqPage(faqs)} />
      <nav aria-label="Breadcrumb" className="ma-crumbs">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Shop</Link>
          </li>
          {cat && (
            <li>
              <Link href={`/shop/${cat.slug}`}>{cat.name}</Link>
            </li>
          )}
          <li>
            <span aria-current="page">{p.name}</span>
          </li>
        </ol>
      </nav>

      <div className="ma-wrap ma-product__top">
        <ProductGallery images={images} name={p.name} />

        <div className="ma-product__info">
          {device &&
            (() => {
              const label = `✓ Fits ${
                devices.length > 2 ? `${devices.slice(0, 2).join(', ')} +${devices.length - 2}` : devices.join(' & ')
              }`;
              return hubDevice ? (
                <Link href={phonePath(hubDevice)} className="ma-product__fit">
                  {label}
                </Link>
              ) : (
                <span className="ma-product__fit">{label}</span>
              );
            })()}
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
                ? `● Out of stock at our supplier. Call ${BUSINESS.phoneDisplay} to check`
                : '● Out of stock'
              : orderIn
                ? `● Ordered in for you, ${STORE.orderIn.readyText}`
                : lowStock
                  ? `● Only ${p.stock} left`
                  : '● In stock at Warringal'}
          </p>

          <BuyBox
            product={cartProduct}
            price={price}
            inStock={inStock}
            phoneDisplay={BUSINESS.phoneDisplay}
            phoneHref={BUSINESS.phoneHref}
          />

          <PairsWith items={addOns} />

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

      <div className="ma-wrap ma-product__details">
        <section aria-labelledby="about">
          <h2 id="about" className="ma-h2" style={{ fontSize: 26 }}>
            About this {noun}
          </h2>
          <div className="ma-product__desc">
            {(p.description || '')
              .split(/\n{2,}|\r\n\r\n/)
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
          {p.features && p.features.length > 0 && (
            <>
              <h3 className="ma-product__h3">Key features</h3>
              <ul className="ma-product__features">
                {p.features.slice(0, 12).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </>
          )}
        </section>
        <aside className="ma-product__side">
          {devices.length > 0 && (
            <div className="ma-panel ma-panel--line" style={{ padding: 22, gap: 8 }}>
              <h2 style={{ fontSize: 18 }}>Compatible with</h2>
              <ul className="ma-product__compat">
                {devices.map((d) => (
                  <li key={d}>{hubDevices.includes(d) ? <Link href={phonePath(d)}>{d}</Link> : d}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="ma-panel ma-panel--line" style={{ padding: 22, gap: 8 }}>
            <h2 style={{ fontSize: 18 }}>Questions</h2>
            {faqs.map((f) => (
              <details key={f.q} className="ma-product__faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </aside>
      </div>

      {alternatives.length > 0 && (
        <section aria-labelledby="alts" className="ma-section">
          <div className="ma-shead">
            <h2 id="alts" className="ma-h2">
              More {cat ? cat.shortName.toLowerCase() : 'like this'}
              {device ? ` for ${device}` : ''}
            </h2>
            {cat && (
              <Link href={`/shop/${cat.slug}`} className="ma-link">
                All {cat.name.toLowerCase()} →
              </Link>
            )}
          </div>
          <div className="ma-pgrid ma-pgrid--4">
            {alternatives.map((r) => (
              <ProductTile key={r._id} product={r} />
            ))}
          </div>
        </section>
      )}

      {repair && (
        <section className="ma-section">
          <div className="ma-cta">
            <div>
              <h2>Already cracked your {device}?</h2>
              <p>
                Our repair desk is right here at Warringal. Most screens and batteries are done in{' '}
                {BUSINESS.repairTimes.common}, with a {BUSINESS.warranty.short}.
              </p>
            </div>
            <div className="ma-actions">
              <Link href={repair.href} className="ma-btn ma-btn--primary">
                {repair.label}
              </Link>
              <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--ghost">
                Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import ProductTop from './ProductTop';
import PairsWith from './PairsWith';
import ProductTile from '@/components/store/ProductTile';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import type { ShopProduct } from '@/lib/shop-data';
import { getShopCategoryByDb } from '@/data/shop-categories';
import { STORE } from '@/data/store-settings';
import { BUSINESS } from '@/data/business';
import { phonePath, repairLinkFor } from '@/lib/device-links';
import '@/components/site/page.css';
import '@/components/store/store.css';
import './product.css';


export default function ProductView({
  product: p,
  addOns,
  alternatives,
  hubDevices = [],
  guides = [],
}: {
  product: ShopProduct;
  addOns: ShopProduct[];
  alternatives: ShopProduct[];
  /** Phones that have their own /phones page; others aren't linked. */
  hubDevices?: string[];
  /** Buying guides that cover this product (linked both ways for search and AI answers). */
  guides?: { slug: string; title: string; category: string; image: string; imageAlt: string }[];
}) {
  const orderIn = p.fulfilment === 'order-in';
  const cat = getShopCategoryByDb(p.category);
  const devices = p.deviceCompatibility || [];
  const device = devices[0];
  const isGlass = p.category === 'Screen Protectors';
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

      <ProductTop product={p} hubDevices={hubDevices} />

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

      <PairsWith items={addOns} device={device} />

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

      {guides.length > 0 && (
        <section aria-labelledby="guides" className="ma-section">
          <div className="ma-shead">
            <h2 id="guides" className="ma-h2">
              Guides for this {noun}
            </h2>
            <Link href="/blog" className="ma-link">
              All guides →
            </Link>
          </div>
          <div className="ma-grid ma-grid--3">
            {guides.map((g) => (
              <Link key={g.slug} href={`/blog/${g.slug}`} className="ma-guide">
                <span className="ma-guide__img">
                  <Image src={g.image} alt={g.imageAlt} fill sizes="(max-width: 860px) 100vw, 400px" />
                </span>
                <span className="ma-guide__body">
                  <span className="ma-guide__tag">{g.category}</span>
                  <span className="ma-guide__title">{g.title}</span>
                </span>
              </Link>
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
                Screen and battery repairs at the kiosk in {BUSINESS.repairTimes.common}, with a{' '}
                {BUSINESS.warranty.short}.
              </p>
            </div>
            <div className="ma-actions">
              <Link href={repair.href} className="ma-btn ma-btn--primary">
                Get a repair quote
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

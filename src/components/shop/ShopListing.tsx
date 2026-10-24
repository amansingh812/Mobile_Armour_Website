import Link from 'next/link';
import ProductTile from '@/components/store/ProductTile';
import PromiseStrip from '@/components/store/PromiseStrip';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import { Breadcrumbs, FaqList } from '@/components/site/PageBits';
import type { Faq } from '@/data/faqs';
import { SITE_URL } from '@/lib/site';
import { productPath, currentPrice } from '@/lib/products';
import type { ShopProduct } from '@/lib/shop-data';
import { BUSINESS, fullAddress } from '@/data/business';
import { STORE } from '@/data/store-settings';
import '@/components/site/page.css';
import '@/components/store/store.css';
import './shop.css';

interface Crumb {
  name: string;
  url?: string;
}

interface ShopListingProps {
  h1: string;
  intro: string[];
  products: ShopProduct[];
  breadcrumbs: Crumb[];
  /** Links to narrower pages, e.g. one per phone model. */
  subLinks?: { label: string; href: string; count: number; active?: boolean }[];
  subLinksHeading?: string;
  buyingTips?: { heading: string; points: string[] };
  /** Canonical path of this page, used for ItemList schema. */
  path: string;
  /** Show the bundle banner (cases and screen protectors). */
  bundleDevice?: string | null;
  /** Question-and-answer block (also output as FAQPage schema). */
  faqs?: Faq[];
  faqHeading?: string;
  /** Guides worth reading before buying. */
  guides?: { title: string; href: string }[];
}

export default function ShopListing({
  h1,
  intro,
  products,
  breadcrumbs,
  subLinks,
  subLinksHeading,
  buyingTips,
  path,
  bundleDevice,
  faqs,
  faqHeading,
  guides,
}: ShopListingProps) {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: h1,
    url: `${SITE_URL}${path}`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}${productPath(p)}`,
      name: p.name,
    })),
  };
  const from = products.length ? Math.min(...products.map((p) => currentPrice(p))) : null;

  return (
    <main className="ma-page ma-shop">
      {products.length > 0 && <JsonLd data={itemList} />}
      {faqs && faqs.length > 0 && <JsonLd data={faqPage(faqs.map((f) => ({ q: f.q, a: f.more ? `${f.short} ${f.more}` : f.short })))} />}
      <Breadcrumbs items={breadcrumbs.map((c) => ({ name: c.name, path: c.url || path }))} />

      <header className="ma-wrap ma-shop__hero">
        <div>
          <h1 className="ma-h1">{h1}</h1>
          {intro.map((para) => (
            <p key={para.slice(0, 32)} className="ma-shop__intro">
              {para}
            </p>
          ))}
        </div>
        {from !== null && (
          <p className="ma-shop__count">
            <strong>{products.length}</strong> {products.length === 1 ? 'product' : 'products'} · from{' '}
            <strong>${from % 1 === 0 ? from : from.toFixed(2)}</strong>
          </p>
        )}
      </header>

      {subLinks && subLinks.length > 0 && (
        <nav className="ma-wrap ma-shop__models" aria-label={subLinksHeading || 'Shop by model'}>
          <span className="ma-shop__models-label">{subLinksHeading || 'Shop by model'}:</span>
          <ul className="ma-chips">
            {subLinks.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className={`ma-chip${s.active ? ' is-on' : ''}`} aria-current={s.active ? 'page' : undefined}>
                  {s.label} <span className="ma-chip__n">{s.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="ma-wrap" style={{ paddingTop: 24 }}>
        {products.length > 0 ? (
          <section aria-label="Products" className="ma-pgrid">
            {products.map((p, i) => (
              <ProductTile key={p._id} product={p} priority={i < 4} />
            ))}
          </section>
        ) : (
          <section className="ma-panel ma-panel--line">
            <h2>New stock coming soon</h2>
            <p>
              We&apos;re restocking this range. Call <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a> or visit the
              kiosk to check what&apos;s in store today.
            </p>
            <Link href="/products" className="ma-link">
              Browse all accessories →
            </Link>
          </section>
        )}
      </div>

      {STORE.bundle.enabled && bundleDevice !== undefined && (
        <section className="ma-section" style={{ paddingTop: 40 }}>
          <div className="ma-shop__bundle">
            <div>
              <span className="ma-eyebrow">{STORE.bundle.label}</span>
              <h2>
                Case + screen protector{STORE.freeFitting ? ' + fitting' : ''}. Save {STORE.bundle.discountPercent}%.
              </h2>
              <p>Pick a case and glass for the same phone and the discount applies in your cart automatically.</p>
            </div>
            <Link
              href={bundleDevice ? `/bundle?device=${encodeURIComponent(bundleDevice)}` : '/bundle'}
              className="ma-btn ma-btn--dark"
            >
              Build your bundle
            </Link>
          </div>
        </section>
      )}

      {buyingTips && (
        <section aria-labelledby="tips" className="ma-section">
          <h2 id="tips" className="ma-h2">
            {buyingTips.heading}
          </h2>
          <div className="ma-grid ma-grid--3" style={{ marginTop: 18 }}>
            {buyingTips.points.map((pt, i) => (
              <div key={pt.slice(0, 32)} className="ma-tile" style={{ padding: 22, gap: 10 }}>
                <span className="ma-steps__n" aria-hidden="true">
                  {i + 1}
                </span>
                <span style={{ fontSize: 15, color: 'var(--ma-body)', lineHeight: 1.6 }}>{pt}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section aria-labelledby="shop-faq" className="ma-section">
          <div className="ma-faq-split">
            <div>
              <h2 id="shop-faq" className="ma-h2">
                {faqHeading || 'Questions'}
              </h2>
              {guides && guides.length > 0 && (
                <ul className="ma-shop__guides">
                  {guides.map((g) => (
                    <li key={g.href}>
                      <Link href={g.href} className="ma-link">
                        {g.title} →
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <FaqList faqs={faqs} />
          </div>
        </section>
      )}

      <section className="ma-section">
        <PromiseStrip compact />
      </section>

      <section className="ma-section">
        <div className="ma-panel ma-panel--line" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
          <div style={{ flex: '1 1 420px' }}>
            <h2 style={{ fontSize: 22 }}>See it in person at Warringal</h2>
            <p style={{ color: 'var(--ma-body)', marginTop: 6 }}>
              {fullAddress}. Try a case on your phone before you buy. Need a repair instead?{' '}
              <Link href="/services" className="ma-link">
                Phone repair services
              </Link>
            </p>
          </div>
          <a href={BUSINESS.mapsUrl} className="ma-btn ma-btn--outline" target="_blank" rel="noopener">
            Get directions
          </a>
        </div>
      </section>
    </main>
  );
}

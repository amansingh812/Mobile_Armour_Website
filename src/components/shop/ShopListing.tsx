import Link from 'next/link';
import ProductCard from '@/components/shared/product/ProductCard';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { SITE_URL } from '@/lib/site';
import { productPath, currentPrice } from '@/lib/products';
import type { ShopProduct } from '@/lib/shop-data';
import '@/components/shared/product/ProductCard.css';
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
  subLinks?: { label: string; href: string; count: number }[];
  subLinksHeading?: string;
  buyingTips?: { heading: string; points: string[] };
  /** Canonical path of this page, used for ItemList schema. */
  path: string;
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

  return (
    <div className="shop-page">
      <BreadcrumbSchema items={breadcrumbs} />
      {products.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      )}

      <div className="container">
        <nav className="shop-breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((c, i) => (
            <span key={c.name}>
              {c.url && i < breadcrumbs.length - 1 ? <Link href={c.url}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
              {i < breadcrumbs.length - 1 && <span className="shop-breadcrumbs-sep">/</span>}
            </span>
          ))}
        </nav>

        <header className="shop-header">
          <h1>{h1}</h1>
          {intro.map((para) => (
            <p key={para.slice(0, 32)}>{para}</p>
          ))}
        </header>

        {subLinks && subLinks.length > 0 && (
          <section className="shop-sublinks" aria-label={subLinksHeading || 'Shop by model'}>
            <h2>{subLinksHeading || 'Shop by model'}</h2>
            <ul>
              {subLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>
                    {s.label} <span className="shop-sublinks-count">({s.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {products.length > 0 ? (
          <section aria-label="Products">
            <p className="shop-count">
              {products.length} {products.length === 1 ? 'product' : 'products'}, from $
              {Math.min(...products.map((p) => currentPrice(p)))}
            </p>
            <div className="shop-grid">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        ) : (
          <section className="shop-empty">
            <h2>New stock coming soon</h2>
            <p>
              We&apos;re restocking this range. Call <a href="tel:+61405326205">0405 326 205</a> or visit our kiosk at
              Warringal Shopping Centre, Heidelberg, to check what&apos;s in store today.
            </p>
            <p>
              <Link href="/products">Browse all accessories</Link>
            </p>
          </section>
        )}

        {buyingTips && (
          <section className="shop-tips">
            <h2>{buyingTips.heading}</h2>
            <ul>
              {buyingTips.points.map((pt) => (
                <li key={pt.slice(0, 32)}>{pt}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="shop-visit">
          <h2>Buy online or visit us in Heidelberg</h2>
          <p>
            Mobile Armour, Kiosk 4, Warringal Shopping Centre, 56 Burgundy Street, Heidelberg VIC 3084. Call{' '}
            <a href="tel:+61405326205">0405 326 205</a>. Need a repair instead?{' '}
            <Link href="/services">See our phone repair services</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}

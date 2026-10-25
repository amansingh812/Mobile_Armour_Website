import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import { Breadcrumbs, FaqList, QuickAnswer } from '@/components/site/PageBits';
import ProductTile from '@/components/store/ProductTile';
import PromiseStrip from '@/components/store/PromiseStrip';
import { getPhoneHub, getPhoneHubs, hubSummary } from '@/lib/phones';
import { repairLinkFor } from '@/lib/device-links';
import { modelRepairPages } from '@/data/model-repair-pages';
import { STORE } from '@/data/store-settings';
import { BUSINESS } from '@/data/business';
import { SITE_URL } from '@/lib/site';
import { productPath, currentPrice } from '@/lib/products';
import { SHOP_CATEGORIES } from '@/data/shop-categories';
import type { Faq } from '@/data/faqs';
import '@/components/site/page.css';
import '@/components/store/store.css';
import '@/app/products/[id]/product.css';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getPhoneHubs()).map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hub = await getPhoneHub(slug);
  if (!hub) notFound();
  const title = `${hub.device} Cases & Screen Protectors | Mobile Armour`;
  const description = `Everything for the ${hub.device}: ${hubSummary(hub.products)}, plus repairs. Collect today at Warringal Shopping Centre, Heidelberg, or get it delivered.`;
  return {
    title,
    description,
    alternates: { canonical: `/phones/${hub.slug}` },
    openGraph: {
      title,
      description,
      url: `/phones/${hub.slug}`,
      siteName: BUSINESS.name,
      locale: 'en_AU',
      type: 'website',
      images: hub.products[0]?.imageUrl ? [{ url: hub.products[0].imageUrl, alt: `${hub.device} accessories` }] : undefined,
    },
  };
}

const SECTIONS = [
  { cat: 'Cases', title: 'Cases', id: 'cases' },
  { cat: 'Screen Protectors', title: 'Screen & lens protection', id: 'screen-protectors' },
  { cat: 'Cables & Adapters', title: 'Chargers & cables that fit', id: 'chargers' },
  { cat: 'Car Holders', title: 'In the car', id: 'car' },
  { cat: 'Power Banks', title: 'Power banks', id: 'power-banks' },
];

export default async function PhoneHubPage({ params }: Props) {
  const { slug } = await params;
  const hub = await getPhoneHub(slug);
  if (!hub) notFound();
  const { device, products } = hub;
  const repair = repairLinkFor(device);
  const model = modelRepairPages.find((m) => m.model.toLowerCase() === device.toLowerCase());
  const nCases = products.filter((p) => p.category === 'Cases').length;
  const nGlass = products.filter((p) => p.category === 'Screen Protectors').length;
  const from = Math.min(...products.map((p) => currentPrice(p)));

  const faqs: Faq[] = [
    {
      id: 'fit',
      q: `Will these accessories fit my ${device}?`,
      short: `Yes. Everything on this page is listed as compatible with the ${device}.`,
      more: STORE.fitGuarantee ? "If something doesn't fit, bring it back unused and we'll swap it the same day." : undefined,
    },
    ...(STORE.clickAndCollect.enabled
      ? [
          {
            id: 'collect',
            q: `Can I pick up a ${device} case today?`,
            short: `Yes. Choose click & collect at checkout and collect from ${BUSINESS.address.unit}, ${BUSINESS.address.centre}, Heidelberg.`,
            more: `Orders are ${STORE.clickAndCollect.readyText}.`,
          },
        ]
      : []),
    {
      id: 'repair',
      q: `Can you repair a ${device}?`,
      short: `Yes. We repair ${device} screens, batteries and charging ports at the kiosk.`,
      more: `Most repairs take ${BUSINESS.repairTimes.common}, with a ${BUSINESS.warranty.short}.`,
      link: { label: repair.label, href: repair.href },
    },
  ];

  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${device} accessories and repairs`,
    url: `${SITE_URL}/phones/${hub.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}${productPath(p)}`, name: p.name })),
    },
  };

  return (
    <main className="ma-page">
      <JsonLd data={collection} />
      <JsonLd data={faqPage(faqs.map((f) => ({ q: f.q, a: f.more ? `${f.short} ${f.more}` : f.short })))} />
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Phones', path: '/phones' }, { name: device, path: `/phones/${hub.slug}` }]} />

      <section className="ma-wrap" style={{ paddingTop: 18 }}>
        <div className="ma-bundle__hero" style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 900 }}>
          <span className="ma-eyebrow">Phone accessories &amp; repairs</span>
          <h1 className="ma-h1">{device} cases, screen protectors &amp; repairs</h1>
          <QuickAnswer>
            Mobile Armour stocks {hubSummary(products)} for the {device}, from ${from % 1 === 0 ? from : from.toFixed(2)}.
            Collect today at {BUSINESS.address.centre}, Heidelberg, or get it delivered. We also repair the {device} at the
            kiosk.
          </QuickAnswer>
          <nav aria-label="On this page" className="ma-chips">
            {SECTIONS.filter((s) => products.some((p) => p.category === s.cat)).map((s) => (
              <a key={s.id} href={`#${s.id}`} className="ma-chip">
                {s.title}
              </a>
            ))}
            <a href="#repairs" className="ma-chip">
              Repairs
            </a>
          </nav>
        </div>
      </section>

      <section className="ma-section" style={{ paddingTop: 32 }}>
        <PromiseStrip compact />
      </section>

      {SECTIONS.map((s) => {
        const list = products.filter((p) => p.category === s.cat);
        if (!list.length) return null;
        const cat = SHOP_CATEGORIES.find((c) => c.dbCategory === s.cat);
        return (
          <section key={s.id} id={s.id} aria-labelledby={`h-${s.id}`} className="ma-section" style={{ scrollMarginTop: 140 }}>
            <div className="ma-shead">
              <h2 id={`h-${s.id}`} className="ma-h2">
                {device} {s.title.toLowerCase().startsWith('in the') ? 'car accessories' : s.title.toLowerCase()}{' '}
                <span style={{ color: 'var(--ma-slate)', fontWeight: 600, fontSize: 18 }}>({list.length})</span>
              </h2>
              {cat && (
                <Link href={`/shop/${cat.slug}`} className="ma-link">
                  All {cat.name.toLowerCase()} →
                </Link>
              )}
            </div>
            <div className="ma-pgrid">
              {list.slice(0, 8).map((p) => (
                <ProductTile key={p._id} product={p} model={hub.device} />
              ))}
            </div>
          </section>
        );
      })}

      {STORE.bundle.enabled && nCases > 0 && nGlass > 0 && (
        <section className="ma-section">
          <div className="ma-product__bundle" style={{ padding: 28 }}>
            <div>
              <strong style={{ fontSize: 20 }}>
                {device} protection bundle: save {STORE.bundle.discountPercent}%
              </strong>
              <span>
                Case + screen protector{STORE.freeFitting ? ', glass fitted free at the kiosk' : ''}.
              </span>
            </div>
            <Link href={`/bundle?device=${encodeURIComponent(device)}`} className="ma-btn ma-btn--dark">
              Build your bundle
            </Link>
          </div>
        </section>
      )}

      <section id="repairs" aria-labelledby="h-repairs" className="ma-section" style={{ scrollMarginTop: 140 }}>
        <h2 id="h-repairs" className="ma-h2">
          {device} repairs
        </h2>
        <p className="ma-lead">
          Cracked screen or tired battery? Our repair desk is at the same kiosk. Most repairs take{' '}
          {BUSINESS.repairTimes.common}, with a {BUSINESS.warranty.short}.
        </p>
        {model ? (
          <div className="ma-table-wrap">
            <table className="ma-table">
              <caption className="ma-sr">{device} repair times</caption>
              <thead>
                <tr>
                  <th scope="col">Repair</th>
                  <th scope="col">Typical time</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {model.repairTypes.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.name}</th>
                    <td>{r.time.replace('-', '–')}</td>
                    <td>{r.priceRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <div className="ma-actions" style={{ marginTop: 18 }}>
          <Link href={repair.href} className="ma-btn ma-btn--dark">
            {repair.label}
          </Link>
          <Link href={`/contact?topic=repair`} className="ma-btn ma-btn--outline">
            Get a repair quote
          </Link>
        </div>
      </section>

      <section aria-labelledby="h-faq" className="ma-section">
        <div className="ma-faq-split">
          <h2 id="h-faq" className="ma-h2">
            {device} questions
          </h2>
          <FaqList faqs={faqs} />
        </div>
      </section>
    </main>
  );
}

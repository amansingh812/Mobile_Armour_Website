import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import { Breadcrumbs, FaqList, QuickAnswer } from '@/components/site/PageBits';
import { HoursTable, OpenNowBadge } from '@/components/site/OpenNow';
import ProductTile from '@/components/store/ProductTile';
import PromiseStrip from '@/components/store/PromiseStrip';
import { getAllProducts } from '@/lib/shop-data';
import { getPhoneHubs } from '@/lib/phones';
import { fromPrice, isPrivacy } from '@/lib/shop-copy';
import { SHOP_CATEGORIES } from '@/data/shop-categories';
import { BUSINESS, SERVICE_AREAS, fullAddress, hoursShort } from '@/data/business';
import { STORE, deliveryFeeText } from '@/data/store-settings';
import type { Faq } from '@/data/faqs';
import { OG_IMAGE } from '@/lib/seo';
import '@/components/site/page.css';
import '@/components/store/store.css';
import '@/app/contact/contact.css';

export const revalidate = 3600;

const PATH = '/phone-accessories-heidelberg';
const TITLE = 'Phone Accessories Shop Heidelberg | Mobile Armour';
const DESCRIPTION = `Phone cases, screen protectors and chargers in stock at Warringal Shopping Centre, Heidelberg. Open 7 days (${hoursShort()}). `;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { images: [OG_IMAGE], title: TITLE, description: DESCRIPTION, url: PATH, siteName: BUSINESS.name, locale: 'en_AU', type: 'website' },
};

export default async function PhoneAccessoriesHeidelbergPage() {
  const [all, hubs] = await Promise.all([getAllProducts(), getPhoneHubs()]);
  const inStock = all.filter((p) => !(typeof p.stock === 'number' && p.stock <= 0));
  const cats = SHOP_CATEGORIES.map((c) => {
    const items = inStock.filter((p) => p.category === c.dbCategory);
    return { ...c, n: items.length, from: fromPrice(items) };
  }).filter((c) => c.n > 0);
  const glass = inStock.filter((p) => p.category === 'Screen Protectors');
  const glassFrom = fromPrice(glass);
  const caseFrom = fromPrice(inStock.filter((p) => p.category === 'Cases'));
  const privacy = inStock.filter(isPrivacy).length;
  const topPhones = hubs.slice(0, 5).map((h) => h.device);

  const faqs: Faq[] = [
    {
      id: 'where',
      q: 'Where can I buy a phone case near Heidelberg?',
      short: `At Mobile Armour, ${fullAddress}.`,
      more: `We're a kiosk inside the shopping centre, open 7 days (${hoursShort()}), with ${inStock.length} accessories in stock${
        caseFrom ? ` and cases from ${caseFrom}` : ''
      }.`,
    },
    {
      id: 'cheap-glass',
      q: 'Where can I get a cheap screen protector in Melbourne?',
      short: glassFrom
        ? `Our tempered glass starts at ${glassFrom}, in stock at Warringal Shopping Centre, Heidelberg.`
        : 'We stock tempered glass at Warringal Shopping Centre, Heidelberg.',
      more: `We carry ${glass.length} screen and lens protectors${privacy ? `, including ${privacy} privacy glass` : ''}, each cut for an exact phone model.`,
    },
    {
      id: 'try',
      q: 'Can I try a case on my phone before buying?',
      short: 'Yes. Bring your phone to the kiosk and try any case in stock.',
      more: 'It’s the easiest way to be sure the fit, buttons and camera cut-out are right.',
    },
    {
      id: 'phones',
      q: 'Which phones do you stock accessories for?',
      short: topPhones.length ? `Mostly the latest iPhones: ${topPhones.join(', ')}.` : 'Mostly the latest iPhones.',
      more: 'Shop by phone to see everything that fits your model in one place.',
    },
    {
      id: 'online',
      q: 'Can I order online and pick up?',
      short: STORE.clickAndCollect.enabled
        ? `Yes. Choose click & collect at checkout; orders are ${STORE.clickAndCollect.readyText}.`
        : 'Yes, order online and collect at the kiosk.',
      more: `Delivery across Australia is ${deliveryFeeText().toLowerCase()}.`,
    },
  ];

  return (
    <main className="ma-page">
      <JsonLd data={faqPage(faqs.map((f) => ({ q: f.q, a: f.more ? `${f.short} ${f.more}` : f.short })))} />
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Phone accessories Heidelberg', path: PATH }]} />

      <section className="ma-hero ma-contact-hero">
        <div className="ma-hero__copy">
          <h1 className="ma-h1">Phone accessories shop in Heidelberg</h1>
          <QuickAnswer>
            Mobile Armour sells phone cases, screen protectors, chargers and car accessories at{' '}
            <strong>{fullAddress}</strong>. We&apos;re open 7 days ({hoursShort()}) with{' '}
            <strong>{inStock.length} accessories in stock</strong>
            {glassFrom ? <>, screen protectors from {glassFrom}</> : null}. Try before you buy, or order online and
            collect.
          </QuickAnswer>
          <div className="ma-actions">
            <Link href="/products" className="ma-btn ma-btn--primary">
              Shop accessories
            </Link>
            <a href={BUSINESS.mapsUrl} className="ma-btn ma-btn--outline" target="_blank" rel="noopener">
              Get directions
            </a>
          </div>
        </div>
        <div className="ma-panel ma-panel--dark ma-hours-card">
          <OpenNowBadge />
          <h2>Opening hours</h2>
          <HoursTable />
          <p className="ma-hours-note">Call {BUSINESS.phoneDisplay} to check a specific item is in stock.</p>
        </div>
      </section>

      <section aria-labelledby="cats" className="ma-section">
        <h2 id="cats" className="ma-h2">
          What&apos;s in stock
        </h2>
        <div className="ma-grid ma-grid--3" style={{ marginTop: 18 }}>
          {cats.map((c) => (
            <Link key={c.slug} href={`/shop/${c.slug}`} className="ma-card">
              <h3>{c.name}</h3>
              <p>
                {c.n} in stock{c.from ? `, from ${c.from}` : ''}
              </p>
              <span className="ma-card__more">Shop {c.name.toLowerCase()} →</span>
            </Link>
          ))}
        </div>
      </section>

      {hubs.length > 0 && (
        <section aria-labelledby="by-phone" className="ma-section">
          <h2 id="by-phone" className="ma-h2">
            Shop by your phone
          </h2>
          <ul className="ma-chips" style={{ marginTop: 14 }}>
            {hubs.slice(0, 10).map((h) => (
              <li key={h.slug}>
                <Link href={`/phones/${h.slug}`} className="ma-chip">
                  {h.device} <span className="ma-chip__n">{h.products.length}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {inStock.length > 0 && (
        <section aria-labelledby="popular" className="ma-section">
          <h2 id="popular" className="ma-h2">
            Popular right now
          </h2>
          <div className="ma-pgrid ma-pgrid--rail" style={{ marginTop: 18 }}>
            {inStock.slice(0, 8).map((p) => (
              <ProductTile key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="ma-section">
        <PromiseStrip compact />
      </section>

      <section aria-labelledby="faq" className="ma-section">
        <div className="ma-faq-split">
          <h2 id="faq" className="ma-h2">
            Questions
          </h2>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section aria-labelledby="near" className="ma-section">
        <h2 id="near" className="ma-h2" style={{ fontSize: 24 }}>
          Close to Ivanhoe, Rosanna, Bulleen and Preston
        </h2>
        <p className="ma-lead">
          {BUSINESS.address.centre} is on {BUSINESS.address.streetShort}, Heidelberg. Phone repairs are done at the same
          kiosk.
        </p>
        <ul className="ma-chips" style={{ marginTop: 14 }}>
          {SERVICE_AREAS.filter((a) => a.slug).map((a) => (
            <li key={a.slug}>
              <Link href={`/phone-repair/${a.slug}`} className="ma-chip">
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

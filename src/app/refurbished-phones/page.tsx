import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd, { BUSINESS_ID, faqPage } from '@/components/seo/JsonLd';
import { Breadcrumbs, FaqList, QuickAnswer } from '@/components/site/PageBits';
import RefurbFinder, { type FinderFamily } from '@/components/refurb/RefurbFinder';
import RefurbEnquiry from '@/components/refurb/RefurbEnquiry';
import { REFURB, REFURB_FAMILIES, REFURB_HUB_FAQS, REFURB_MODEL_NAMES, refurbPath } from '@/data/refurbished';
import { blogPosts } from '@/data/blog-posts';
import { BUSINESS, fullAddress, hoursShort } from '@/data/business';
import { SITE_URL } from '@/lib/site';
import '@/components/site/page.css';
import '@/app/contact/contact.css';
import '@/components/refurb/refurb.css';

const PATH = REFURB.path;
const TITLE = 'Refurbished Phones Heidelberg | iPhone & Samsung | Mobile Armour';
const DESCRIPTION =
  'Refurbished iPhones and Samsung Galaxy phones at Warringal Shopping Centre, Heidelberg. Graded, fully checked, 6-month warranty. Ask what’s in stock today.';
const OG = `${SITE_URL}/img/refurb/refurb-hero.webp`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    images: [{ url: OG, width: 1600, height: 900, alt: 'Refurbished phones at Mobile Armour, Heidelberg' }],
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: BUSINESS.name,
    locale: 'en_AU',
    type: 'website',
  },
};

export default function RefurbishedPhonesPage() {
  const families: FinderFamily[] = REFURB_FAMILIES.map((f) => ({
    slug: f.slug,
    brand: f.brand,
    title: f.title,
    year: f.year,
    summary: f.summary,
    href: f.page ? refurbPath(f) : undefined,
    models: f.models.map((m) => ({ name: m.name, spec: m.spec })),
  }));
  const guides = blogPosts.filter((p) => p.tags.includes('Refurbished Phones'));

  // Service, not Product: there are no prices, and Product without an offer is
  // an invalid rich result.
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${PATH}#service`,
    name: 'Refurbished iPhones and Android phones',
    serviceType: 'Refurbished phone sales',
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    provider: { '@id': BUSINESS_ID },
    areaServed: [{ '@type': 'City', name: 'Melbourne' }, { '@type': 'Place', name: 'Heidelberg VIC' }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Refurbished phones',
      itemListElement: REFURB_FAMILIES.map((f) => ({
        '@type': 'OfferCatalog',
        name: `Refurbished ${f.title}`,
        url: `${SITE_URL}${refurbPath(f)}`,
      })),
    },
  };

  return (
    <main className="ma-page">
      <JsonLd data={service} />
      <JsonLd data={faqPage(REFURB_HUB_FAQS.map((f) => ({ q: f.q, a: f.more ? `${f.short} ${f.more}` : f.short })))} />
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Refurbished phones', path: PATH }]} />

      <section className="ma-hero">
        <div className="ma-hero__copy">
          <span className="ma-eyebrow">Refurbished iPhone &amp; Android</span>
          <h1 className="ma-h1">Refurbished phones in Heidelberg</h1>
          <QuickAnswer>
            Mobile Armour sells <strong>refurbished iPhones and Samsung Galaxy phones</strong> at {fullAddress}. Every
            phone is graded and fully checked, and comes with a <strong>{REFURB.warranty}</strong>: if anything goes
            wrong, we fix it. We can get most models, including recent ones, to suit your budget. Ask what&apos;s in
            stock.
          </QuickAnswer>
          <div className="ma-actions">
            <a href="#enquire" className="ma-btn ma-btn--primary">
              Ask what&apos;s in stock
            </a>
            <a href="#models" className="ma-btn ma-btn--outline">
              Find your model
            </a>
          </div>
        </div>
        <div className="ma-hero__media">
          <Image
            src="/img/refurb/refurb-hero.webp"
            alt="A row of refurbished smartphones, checked and ready to sell"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 560px"
          />
        </div>
      </section>

      <section className="ma-section">
        <ul className="ma-refurb-trust">
          <li>
            <strong>Fully checked</strong>
            <span>Screen, battery, cameras, buttons, charging and signal</span>
          </li>
          <li>
            <strong>Graded</strong>
            <span>We tell you the cosmetic grade before you buy</span>
          </li>
          <li>
            <strong>{REFURB.warranty}</strong>
            <span>If anything goes wrong, we fix it</span>
          </li>
          <li>
            <strong>See it first</strong>
            <span>Try the phone at the kiosk, open 7 days</span>
          </li>
        </ul>
      </section>

      <section aria-labelledby="models-h" className="ma-section" id="models">
        <h2 id="models-h" className="ma-h2">
          Find your model
        </h2>
        <p className="ma-lead">
          Search or pick a brand, then tap a model to ask about it. We don&apos;t list prices online because stock and
          prices change daily; tell us your budget and we&apos;ll tell you the best phone we can do.
        </p>
        <RefurbFinder families={families} />
      </section>

      <section aria-labelledby="checks" className="ma-section">
        <h2 id="checks" className="ma-h2">
          What we check on every refurbished phone
        </h2>
        <ul className="ma-refurb-checks">
          {REFURB.checks.map((c) => (
            <li key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
        <p className="ma-lead" style={{ marginTop: 18 }}>
          {REFURB.grading}
        </p>
      </section>

      <section aria-labelledby="how" className="ma-section">
        <h2 id="how" className="ma-h2" style={{ marginBottom: 18 }}>
          How buying a refurbished phone works
        </h2>
        <ol className="ma-steps" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <li>
            <span className="ma-steps__n">1</span>
            <h3>Tell us what you want</h3>
            <p>The model, storage, condition and your budget, by call, text, WhatsApp, email or the form below.</p>
          </li>
          <li>
            <span className="ma-steps__n">2</span>
            <h3>We tell you what we have</h3>
            <p>What&apos;s in stock now, or what we can get for you, with the grade and price.</p>
          </li>
          <li>
            <span className="ma-steps__n">3</span>
            <h3>See it and take it home</h3>
            <p>
              Try it at {BUSINESS.address.unit}, {BUSINESS.address.centre} ({hoursShort()}). Add a case and screen
              protector while you&apos;re there.
            </p>
          </li>
        </ol>
      </section>

      <section className="ma-section">
        <RefurbEnquiry models={REFURB_MODEL_NAMES} />
      </section>

      {guides.length > 0 && (
        <section aria-labelledby="guides" className="ma-section">
          <h2 id="guides" className="ma-h2">
            Buying guides
          </h2>
          <div className="ma-grid ma-grid--3" style={{ marginTop: 18 }}>
            {guides.map((g) => (
              <Link key={g.slug} href={`/blog/${g.slug}`} className="ma-card">
                <h3>{g.title}</h3>
                <p>{g.excerpt.length > 140 ? `${g.excerpt.slice(0, 137)}…` : g.excerpt}</p>
                <span className="ma-card__more">Read the guide →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="faq" className="ma-section">
        <div className="ma-faq-split">
          <h2 id="faq" className="ma-h2">
            Refurbished phone questions
          </h2>
          <FaqList faqs={REFURB_HUB_FAQS} />
        </div>
      </section>

      <section aria-labelledby="more" className="ma-section">
        <h2 id="more" className="ma-h2" style={{ fontSize: 24 }}>
          Also at the kiosk
        </h2>
        <p className="ma-lead">
          Cases and screen protectors for your new phone, <Link href="/shop/cables-adapters">USB-C chargers and cables</Link>,
          and <Link href="/services">phone repairs</Link> with a {BUSINESS.warranty.short}.
        </p>
        <div className="ma-actions">
          <Link href="/shop/cases" className="ma-btn ma-btn--outline">
            Shop cases
          </Link>
          <Link href="/shop/screen-protectors" className="ma-btn ma-btn--outline">
            Shop screen protectors
          </Link>
        </div>
      </section>
    </main>
  );
}

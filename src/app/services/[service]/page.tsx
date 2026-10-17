import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs } from '@/data/service-pages';
import { locationPages } from '@/data/location-pages';
import { modelRepairPages } from '@/data/model-repair-pages';
import JsonLd, { BUSINESS_ID, faqPage } from '@/components/seo/JsonLd';
import { Breadcrumbs, FaqList, QuickAnswer } from '@/components/site/PageBits';
import { BUSINESS, SERVICE_AREAS, hoursSummary } from '@/data/business';
import { STORE } from '@/data/store-settings';
import RepairQuotePicker from './RepairQuotePicker';
import '@/components/site/page.css';
import '@/app/contact/contact.css';
import './service.css';

interface PageProps {
  params: Promise<{ service: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ service: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${slug}`,
      siteName: BUSINESS.name,
      locale: 'en_AU',
      type: 'website',
    },
  };
}

// "iPhone Screen Repair" -> "iPhone screen repair" (brand names keep their case)
const BRANDS = ['iPhone', 'iPad', 'Samsung', 'Google', 'Pixel', 'Apple', 'Watch', 'MacBook'];
const lowerTitle = (t: string) =>
  t
    .split(' ')
    .map((w) => (BRANDS.includes(w) ? w : w.toLowerCase()))
    .join(' ');

const firstSentences = (text: string, n: number) =>
  (text.match(/[^.!?]+[.!?]+/g) || [text]).slice(0, n).join(' ').trim();

export default async function ServiceDetailPage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const modelPages: Record<string, string> = {};
  for (const m of service.models) {
    const page = modelRepairPages.find((p) => p.model.toLowerCase() === m.toLowerCase());
    if (page) modelPages[m] = `/repairs/${page.slug}`;
  }
  const faqs = service.faqs.map((f, i) => {
    const short = firstSentences(f.answer, 1);
    const rest = f.answer.slice(short.length).trim();
    return { id: `faq-${i + 1}`, q: f.question, short, more: rest || undefined };
  });
  const steps = service.processSteps.map((s) => {
    const [title, ...body] = s.split(/\s+[—–-]\s+/);
    return { title: title.trim(), body: body.join(' — ').trim() };
  });
  const protects = /screen|glass|lens|protector/i.test(slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.intro,
    url: `${BUSINESS.url}/services/${slug}`,
    provider: { '@id': BUSINESS_ID },
    areaServed: locationPages.map((loc) => ({ '@type': 'City', name: `${loc.name}, VIC ${loc.postcode}` })),
  };

  return (
    <main className="ma-page">
      <JsonLd data={schema} />
      <JsonLd data={faqPage(faqs.map((f) => ({ q: f.q, a: f.more ? `${f.short} ${f.more}` : f.short })))} />
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Repairs', path: '/services' },
          { name: service.title, path: `/services/${slug}` },
        ]}
      />

      <section className="ma-hero ma-svc-hero">
        <div className="ma-hero__copy">
          <span className="ma-eyebrow">Repairs at Warringal Shopping Centre</span>
          <h1 className="ma-h1">{service.heroHeading}</h1>
          <p className="ma-byline">{service.heroSubheading}</p>
          <QuickAnswer>
            {firstSentences(service.intro, 2)} Every repair comes with a <strong>{BUSINESS.warranty.long}</strong>.
          </QuickAnswer>
          <div className="ma-actions">
            <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--primary">
              Call {BUSINESS.phoneDisplay}
            </a>
            <a href={BUSINESS.mapsUrl} className="ma-btn ma-btn--outline" target="_blank" rel="noopener">
              Get directions
            </a>
          </div>
        </div>
        {service.models.length > 0 && (
          <RepairQuotePicker service={service.title} models={service.models} modelPages={modelPages} />
        )}
      </section>

      <section aria-labelledby="issues" className="ma-section">
        <h2 id="issues" className="ma-h2">
          Signs you need {lowerTitle(service.title)}
        </h2>
        <p className="ma-lead">{service.intro}</p>
        <ul className="ma-grid ma-grid--3 ma-svc-issues">
          {service.commonIssues.map((i) => (
            <li key={i} className="ma-tile">
              <strong>{i}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how" className="ma-section">
        <h2 id="how" className="ma-h2">
          How does the repair work?
        </h2>
        <ol className="ma-steps" style={{ marginTop: 18 }}>
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="ma-steps__n" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              {s.body && <p>{s.body}</p>}
            </li>
          ))}
        </ol>
      </section>

      {service.models.length > 0 && (
        <section aria-labelledby="models" className="ma-section">
          <h2 id="models" className="ma-h2">
            Which models do you repair?
          </h2>
          <ul className="ma-chips" style={{ marginTop: 16 }}>
            {service.models.map((m) => (
              <li key={m}>
                {modelPages[m] ? (
                  <Link href={modelPages[m]} className="ma-chip">
                    {m}
                  </Link>
                ) : (
                  <span className="ma-chip">{m}</span>
                )}
              </li>
            ))}
          </ul>
          <p className="ma-note">Not listed? Call {BUSINESS.phoneDisplay}; we repair many more models.</p>
        </section>
      )}

      <section className="ma-section">
        <div className="ma-grid ma-grid--2">
          <div className="ma-panel ma-panel--peach">
            <h2>What warranty do I get?</h2>
            <p>{service.warrantyNote}</p>
          </div>
          {protects ? (
            <div className="ma-panel ma-panel--dark">
              <h2>Protect the new screen</h2>
              <p>
                A tempered glass screen protector costs far less than another repair.
                {STORE.freeFitting ? ' Buy one from us and we fit it free before you leave.' : ''}
              </p>
              <div className="ma-actions">
                <Link href="/shop/screen-protectors" className="ma-btn ma-btn--primary">
                  Screen protectors
                </Link>
                {STORE.bundle.enabled && (
                  <Link href="/bundle" className="ma-btn ma-btn--ghost">
                    Case + glass bundle
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="ma-panel ma-panel--dark">
              <h2>Is my data safe?</h2>
              <p>
                Yes. We don&apos;t open your apps, photos or messages unless you ask us to. We still recommend a backup
                before any repair.
              </p>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="faq" className="ma-section">
        <div className="ma-faq-split">
          <div>
            <h2 id="faq" className="ma-h2">
              {service.title} questions
            </h2>
            <Link href="/faq" className="ma-link">
              All FAQs →
            </Link>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section aria-labelledby="areas" className="ma-section">
        <h2 id="areas" className="ma-h2" style={{ fontSize: 24 }}>
          {service.title} near you
        </h2>
        <ul className="ma-chips" style={{ marginTop: 14 }}>
          {SERVICE_AREAS.filter((a) => a.slug).map((a) => (
            <li key={a.name}>
              <Link href={`/phone-repair/${a.slug}`} className="ma-chip">
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="ma-section">
        <div className="ma-cta">
          <div>
            <h2>Bring it in today</h2>
            <p>
              {BUSINESS.address.unit}, {BUSINESS.address.centre}, {BUSINESS.address.streetShort}, Heidelberg · {hoursSummary()}
            </p>
          </div>
          <div className="ma-actions">
            <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--primary">
              Call {BUSINESS.phoneDisplay}
            </a>
            <Link href="/services" className="ma-btn ma-btn--ghost">
              All repairs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

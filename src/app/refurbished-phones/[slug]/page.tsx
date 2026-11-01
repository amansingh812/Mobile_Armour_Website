import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd, { BUSINESS_ID, faqPage } from '@/components/seo/JsonLd';
import { Breadcrumbs, FaqList, QuickAnswer } from '@/components/site/PageBits';
import RefurbEnquiry from '@/components/refurb/RefurbEnquiry';
import { REFURB, REFURB_MODEL_NAMES, REFURB_PAGES, getRefurbFamily, refurbPath } from '@/data/refurbished';
import { getAllModelSlugs } from '@/data/model-repair-pages';
import { blogPosts } from '@/data/blog-posts';
import { BUSINESS } from '@/data/business';
import type { Faq } from '@/data/faqs';
import { SITE_URL } from '@/lib/site';
import '@/components/site/page.css';
import '@/app/contact/contact.css';
import '@/components/refurb/refurb.css';

interface Props {
  params: Promise<{ slug: string }>;
}

// Only the families in refurbished.ts have pages; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return REFURB_PAGES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = getRefurbFamily((await params).slug);
  if (!f) notFound();
  const path = refurbPath(f);
  const title = f.metaTitle || `Refurbished ${f.title} Heidelberg | Mobile Armour`;
  const description = f.metaDescription || f.summary;
  return {
    title,
    description,
    keywords: f.keywords,
    alternates: { canonical: path },
    openGraph: {
      images: [{ url: `${SITE_URL}/img/refurb/refurb-hero.webp`, width: 1600, height: 900, alt: `Refurbished ${f.title}` }],
      title,
      description,
      url: path,
      siteName: BUSINESS.name,
      locale: 'en_AU',
      type: 'website',
    },
  };
}

export default async function RefurbFamilyPage({ params }: Props) {
  const f = getRefurbFamily((await params).slug);
  if (!f) notFound();
  const path = refurbPath(f);
  const names = f.models.map((m) => m.name);
  const h1 = f.brand === 'iPhone' ? `Refurbished ${f.title} in Heidelberg` : `Refurbished ${f.title} phones in Heidelberg`;
  const faqs: Faq[] = [
    ...(f.faqs || []),
    {
      id: 'warranty',
      q: `Does a refurbished ${f.title} come with a warranty?`,
      short: `Yes, a ${REFURB.warranty}: if anything goes wrong with the phone, we fix it.`,
      more: 'You also have your rights under the Australian Consumer Law.',
    },
    {
      id: 'price',
      q: `How much is a refurbished ${f.title}?`,
      short: 'It depends on the model, storage and condition, and stock changes daily, so we don’t list prices online.',
      more: 'Tell us your budget and we’ll tell you the best option we have or can get.',
    },
  ];
  const repairSlugs = new Set(getAllModelSlugs());
  const repairs = names
    .map((n) => ({ n, slug: `${n.toLowerCase().replace(/\s+/g, '-')}-repair` }))
    .filter((r) => repairSlugs.has(r.slug));
  const guides = blogPosts.filter((p) => p.tags.includes('Refurbished Phones')).slice(0, 3);
  const others = REFURB_PAGES.filter((o) => o.slug !== f.slug);

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name: `Refurbished ${f.title}`,
    serviceType: 'Refurbished phone sales',
    description: f.metaDescription || f.summary,
    url: `${SITE_URL}${path}`,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'City', name: 'Melbourne' },
  };

  return (
    <main className="ma-page">
      <JsonLd data={service} />
      <JsonLd data={faqPage(faqs.map((x) => ({ q: x.q, a: x.more ? `${x.short} ${x.more}` : x.short })))} />
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Refurbished phones', path: REFURB.path },
          { name: `Refurbished ${f.title}`, path },
        ]}
      />

      <section className="ma-hero">
        <div className="ma-hero__copy">
          <span className="ma-eyebrow">
            Refurbished {f.brand}
            {f.year ? ` · ${f.year}` : ''}
          </span>
          <h1 className="ma-h1">{h1}</h1>
          <QuickAnswer>{f.intro}</QuickAnswer>
          <div className="ma-actions">
            <a href="#enquire" className="ma-btn ma-btn--primary">
              Ask what&apos;s in stock
            </a>
            <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--outline">
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="ma-hero__media">
          <Image
            src="/img/refurb/refurb-hero.webp"
            alt={`Refurbished ${f.title} phones, checked and ready to sell`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 560px"
          />
        </div>
      </section>

      <section aria-labelledby="models" className="ma-section">
        <h2 id="models" className="ma-h2">
          {f.title} models we sell refurbished
        </h2>
        <table className="ma-refurb-specs">
          <tbody>
            {f.models.map((m) => (
              <tr key={m.name}>
                <th scope="row">{m.name}</th>
                <td>{m.spec || 'Ask us about this model'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ma-lead" style={{ marginTop: 14 }}>
          Every phone is graded, fully checked and comes with a {REFURB.warranty}. Stock changes daily, so{' '}
          <a href="#enquire" className="ma-link">
            ask what we have
          </a>
          .
        </p>
      </section>

      {(f.goodFor?.length || f.keepInMind?.length) && (
        <section className="ma-section">
          <div className="ma-refurb-lists">
            {f.goodFor?.length ? (
              <div className="ma-panel ma-panel--peach">
                <h2 style={{ fontSize: 20, margin: 0 }}>A refurbished {f.title} is good for</h2>
                <ul>
                  {f.goodFor.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {f.keepInMind?.length ? (
              <div className="ma-panel ma-panel--line">
                <h2 style={{ fontSize: 20, margin: 0 }}>Good to know</h2>
                <ul>
                  {f.keepInMind.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      )}

      <section aria-labelledby="checks" className="ma-section">
        <h2 id="checks" className="ma-h2">
          What we check before it&apos;s sold
        </h2>
        <ul className="ma-refurb-checks">
          {REFURB.checks.map((c) => (
            <li key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="ma-section">
        <RefurbEnquiry models={REFURB_MODEL_NAMES} defaultModel={names[0]} />
      </section>

      <section aria-labelledby="faq" className="ma-section">
        <div className="ma-faq-split">
          <h2 id="faq" className="ma-h2">
            Refurbished {f.title}: questions
          </h2>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section aria-labelledby="more" className="ma-section">
        <h2 id="more" className="ma-h2" style={{ fontSize: 24 }}>
          Other refurbished phones
        </h2>
        <ul className="ma-chips" style={{ marginTop: 14 }}>
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={refurbPath(o)} className="ma-chip">
                Refurbished {o.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href={REFURB.path} className="ma-chip">
              All refurbished phones
            </Link>
          </li>
        </ul>
        {(repairs.length > 0 || guides.length > 0) && (
          <p className="ma-lead" style={{ marginTop: 18 }}>
            {repairs.length > 0 && (
              <>
                Already have one that needs fixing? See{' '}
                {repairs.map((r, i) => (
                  <span key={r.slug}>
                    {i > 0 ? ', ' : ''}
                    <Link href={`/repairs/${r.slug}`}>{r.n} repairs</Link>
                  </span>
                ))}
                .{' '}
              </>
            )}
            {guides.length > 0 && (
              <>
                Read: <Link href={`/blog/${guides[0].slug}`}>{guides[0].title}</Link>
              </>
            )}
          </p>
        )}
      </section>
    </main>
  );
}

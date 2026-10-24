import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import JsonLd, { BUSINESS_ID } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/site/PageBits';
import { BUSINESS } from '@/data/business';
import '@/components/site/page.css';
import './blog.css';
import { OG_IMAGE } from '@/lib/seo';

const TITLE = 'Phone Repair Guides & Tips | Mobile Armour Heidelberg';
const DESCRIPTION =
  'Honest guides from our Heidelberg repair bench: cracked screens, battery health, water damage and repair costs, so you know your options before you pay.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: '/blog',
    siteName: BUSINESS.name,
    locale: 'en_AU',
  },
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', timeZone: BUSINESS.timeZone });

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort(
    (a, b) => +new Date(b.modifiedDate || b.publishedDate) - +new Date(a.modifiedDate || a.publishedDate)
  );
  const [featured, ...rest] = posts;

  const blog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Mobile Armour repair guides',
    url: `${BUSINESS.url}/blog`,
    publisher: { '@id': BUSINESS_ID },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${BUSINESS.url}/blog/${p.slug}`,
      datePublished: p.publishedDate,
      dateModified: p.modifiedDate || p.publishedDate,
    })),
  };

  return (
    <main className="ma-page">
      <JsonLd data={blog} />
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Guides', path: '/blog' }]} />

      <section className="ma-blog-hero">
        <div className="ma-blog-hero__inner">
          <span className="ma-eyebrow">From the repair bench</span>
          <h1 className="ma-h1">Phone repair guides and tips</h1>
          <p>
            Honest answers from our technicians at {BUSINESS.address.centre}, Heidelberg, so you know your options before
            you pay for anything.
          </p>
        </div>
      </section>

      {featured && (
        <section aria-label="Latest guide" className="ma-section" style={{ paddingTop: 32 }}>
          <Link href={`/blog/${featured.slug}`} className="ma-blog-feature">
            <span className="ma-blog-feature__img">
              <Image src={featured.image} alt={featured.imageAlt} fill priority sizes="(max-width: 860px) 100vw, 700px" />
            </span>
            <span className="ma-blog-feature__body">
              <span className="ma-guide__tag">{featured.category}</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <span className="ma-meta">
                {fmt(featured.modifiedDate || featured.publishedDate)} · {featured.readingTime} min read
              </span>
              <span className="ma-card__more">Read the guide →</span>
            </span>
          </Link>
        </section>
      )}

      <section aria-labelledby="all" className="ma-section" style={{ paddingTop: 48 }}>
        <h2 id="all" className="ma-h2">
          All guides
        </h2>
        <div className="ma-grid ma-grid--3" style={{ marginTop: 20 }}>
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="ma-guide">
              <span className="ma-guide__img">
                <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 860px) 100vw, 400px" />
              </span>
              <span className="ma-guide__body">
                <span className="ma-guide__tag">{p.category}</span>
                <span className="ma-guide__title">{p.title}</span>
                <span className="ma-guide__excerpt">{p.excerpt}</span>
                <span className="ma-meta">
                  {fmt(p.modifiedDate || p.publishedDate)} · {p.readingTime} min read
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="ma-section">
        <div className="ma-cta">
          <div>
            <h2>Rather have an expert look at it?</h2>
            <p>
              Walk in to {BUSINESS.address.unit}, {BUSINESS.address.centre}. Most repairs are done in{' '}
              {BUSINESS.repairTimes.common}.
            </p>
          </div>
          <div className="ma-actions">
            <Link href="/contact?topic=repair" className="ma-btn ma-btn--primary">
              Book a repair
            </Link>
            <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--ghost">
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

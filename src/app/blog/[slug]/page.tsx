import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import JsonLd, { BUSINESS_ID, faqPage } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/site/PageBits';
import { BUSINESS, hoursSummary } from '@/data/business';
import { extractFaqs, withHeadingIds } from '@/lib/blog-content';
import { getAllProducts } from '@/lib/shop-data';
import { productsForGuide } from '@/lib/guide-products';
import { currentPrice, productPath } from '@/lib/products';
import ProductTile from '@/components/store/ProductTile';
import '@/components/store/store.css';
import '@/components/site/page.css';
import '../blog.css';

// The "Shop this guide" row shows live stock; refresh it at most hourly
// (admin product saves refresh it straight away).
export const revalidate = 3600;

// Server-rendered: the full article, headings, schema and links are in the
// first HTML response, which is what Google and AI crawlers read.
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const { html, toc } = withHeadingIds(post.content);
  const faqs = extractFaqs(post.content);
  const updated = post.modifiedDate || post.publishedDate;
  const updatedLabel = new Date(updated).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: BUSINESS.timeZone,
  });
  const url = `${BUSINESS.url}/blog/${post.slug}`;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: `${BUSINESS.url}${post.image}`,
      caption: post.imageAlt,
    },
    author: { '@type': 'Organization', name: post.author, url: BUSINESS.url },
    publisher: { '@id': BUSINESS_ID },
    datePublished: post.publishedDate,
    dateModified: updated,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    inLanguage: 'en-AU',
  };

  // Products this guide covers, in stock now. Shown as tiles and listed in
  // ItemList schema so search engines and AI answers can cite real products.
  const shopItems = post.shop ? productsForGuide(post, await getAllProducts()) : [];
  const itemList =
    shopItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: post.shop?.title || `Products for: ${post.title}`,
          itemListElement: shopItems.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${BUSINESS.url}${productPath(p)}`,
            name: p.name,
            item: {
              '@type': 'Product',
              name: p.name,
              url: `${BUSINESS.url}${productPath(p)}`,
              image: p.imageUrl,
              brand: p.brand ? { '@type': 'Brand', name: p.brand } : undefined,
              offers: {
                '@type': 'Offer',
                price: currentPrice(p),
                priceCurrency: 'AUD',
                availability: 'https://schema.org/InStock',
                seller: { '@id': BUSINESS_ID },
              },
            },
          })),
        }
      : null;

  const related = [
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    <main className="ma-page ma-post">
      <JsonLd data={article} />
      {faqs.length > 0 && <JsonLd data={faqPage(faqs)} />}
      {itemList && <JsonLd data={itemList} />}
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <div className="ma-wrap ma-post__layout">
        <article className="ma-post__main">
          <header className="ma-post__header">
            <span className="ma-eyebrow">{post.category}</span>
            <h1 className="ma-post__title">{post.title}</h1>
            <p className="ma-byline">
              By {post.author} · {post.modifiedDate ? 'Updated' : 'Published'} <time dateTime={updated}>{updatedLabel}</time> · {post.readingTime} min read
            </p>
          </header>

          <section aria-label="In short" className="ma-quick">
            <p className="ma-quick__label">In short</p>
            <p className="ma-quick__text">{post.excerpt}</p>
          </section>

          <figure className="ma-post__figure">
            <div className="ma-post__img">
              <Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 960px) 100vw, 800px" />
            </div>
            <figcaption>{post.imageAlt}</figcaption>
          </figure>

          {toc.length > 2 && (
            <details className="ma-toc ma-toc--inline">
              <summary>In this guide ({toc.length} sections)</summary>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.text}</a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          <div className="ma-prose" dangerouslySetInnerHTML={{ __html: html }} />

          {shopItems.length > 0 && (
            <section aria-labelledby="shop-guide" className="ma-post__shop">
              <div className="ma-shead">
                <h2 id="shop-guide" className="ma-h2" style={{ fontSize: 26 }}>
                  {post.shop?.title || 'Shop this guide'}
                </h2>
                {post.shop?.href && (
                  <Link href={post.shop.href} className="ma-link">
                    See all →
                  </Link>
                )}
              </div>
              <p className="ma-meta">Available now: click &amp; collect from our kiosk at Warringal Shopping Centre, Heidelberg, or delivered by Australia Post.</p>
              <div className="ma-pgrid ma-pgrid--guide">
                {shopItems.map((p) => (
                  <ProductTile key={p._id} product={p} />
                ))}
              </div>
            </section>
          )}

          <aside className="ma-post__cta" aria-label="Book a repair">
            <h2>Need it fixed? Bring it to Warringal.</h2>
            <p>
              Most screens, batteries and charging ports are done in {BUSINESS.repairTimes.common}, with a{' '}
              {BUSINESS.warranty.short}. Walk-ins welcome.
            </p>
            <div className="ma-actions">
              <Link href="/contact?topic=repair" className="ma-btn ma-btn--primary">
                Book a repair
              </Link>
              <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--ghost">
                Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </aside>

          {post.tags?.length > 0 && (
            <ul className="ma-chips ma-post__tags" aria-label="Topics">
              {post.tags.map((t) => (
                <li key={t}>
                  <span className="ma-chip">{t}</span>
                </li>
              ))}
            </ul>
          )}
        </article>

        <aside className="ma-post__aside" aria-label="More from Mobile Armour">
          {toc.length > 2 && (
            <nav className="ma-toc ma-toc--side" aria-label="In this guide">
              <p className="ma-toc__title">In this guide</p>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="ma-panel ma-panel--dark" style={{ padding: 22, gap: 10 }}>
            <strong style={{ color: '#fff', fontSize: 18 }}>Talk to a technician</strong>
            <span style={{ fontSize: 14 }}>
              {BUSINESS.address.unit}, {BUSINESS.address.centre}, Heidelberg · {hoursSummary()}
            </span>
            <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--primary">
              Call {BUSINESS.phoneDisplay}
            </a>
            <a href={BUSINESS.mapsUrl} className="ma-btn ma-btn--ghost" target="_blank" rel="noopener">
              Get directions
            </a>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="ma-section">
          <h2 id="related" className="ma-h2">
            Keep reading
          </h2>
          <div className="ma-grid ma-grid--3" style={{ marginTop: 20 }}>
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="ma-guide">
                <span className="ma-guide__img">
                  <Image src={r.image} alt={r.imageAlt} fill sizes="(max-width: 860px) 100vw, 400px" />
                </span>
                <span className="ma-guide__body">
                  <span className="ma-guide__tag">{r.category}</span>
                  <span className="ma-guide__title">{r.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

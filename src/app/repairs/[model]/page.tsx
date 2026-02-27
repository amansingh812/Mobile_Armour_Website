import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { modelRepairPages, getModelBySlug, getAllModelSlugs, getModelsByBrand } from '@/data/model-repair-pages';
import { locationPages } from '@/data/location-pages';
import { servicePages } from '@/data/service-pages';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

interface PageProps {
  params: Promise<{ model: string }>;
}

export async function generateStaticParams() {
  return getAllModelSlugs().map((slug) => ({ model: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { model: slug } = await params;
  const page = getModelBySlug(slug);
  if (!page) return { title: 'Not Found' };

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://www.mobilearmour.com.au/repairs/${slug}`,
      siteName: 'Mobile Armour',
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.model} Repair - Mobile Armour Heidelberg`,
      description: page.metaDescription,
    },
    alternates: {
      canonical: `https://www.mobilearmour.com.au/repairs/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function ModelRepairPage({ params }: PageProps) {
  const { model: slug } = await params;
  const page = getModelBySlug(slug);
  if (!page) notFound();

  // Related models from same brand (for internal linking)
  const relatedModels = getModelsByBrand(page.brand).filter((m) => m.slug !== slug);

  // JSON-LD Service schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${page.model} Repair`,
    description: page.intro,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Mobile Armour',
      telephone: '+61405326205',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kiosk 4, Warringal Shopping Centre, 56 Burgundy Street',
        addressLocality: 'Heidelberg',
        addressRegion: 'VIC',
        postalCode: '3084',
        addressCountry: 'AU',
      },
    },
    areaServed: locationPages.map((loc) => ({
      '@type': 'City',
      name: `${loc.name}, VIC ${loc.postcode}`,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${page.model} Repair Services`,
      itemListElement: page.repairTypes.map((rt) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${page.model} ${rt.name}`,
          description: `${rt.name} for ${page.model} — estimated time ${rt.time}`,
        },
      })),
    },
    url: `https://www.mobilearmour.com.au/repairs/${slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const brandLabel =
    page.brand === 'apple' ? 'iPhone' : page.brand === 'samsung' ? 'Samsung' : page.brand === 'google' ? 'Google Pixel' : 'iPad';

  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: `${brandLabel} Repair` },
          { name: page.model },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ── */}
      <section style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #2d5a8c 100%)', color: '#fff', padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <nav aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
            <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', opacity: 0.85, flexWrap: 'wrap' }}>
              <li><Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link> /</li>
              <li><Link href="/services" style={{ color: '#fff', textDecoration: 'none' }}>Services</Link> /</li>
              <li style={{ color: '#FF5600' }}>{page.model} Repair</li>
            </ol>
          </nav>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>{page.heroHeading}</h1>
          <p style={{ fontSize: '1.15rem', maxWidth: '700px', opacity: 0.9 }}>{page.heroSubheading}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link
              href="tel:0405326205"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
                background: '#FF5600', color: '#fff', borderRadius: '6px', textDecoration: 'none',
                fontWeight: 600, fontSize: '1.05rem',
              }}
            >
              Get Quote — 0405-326-205
            </Link>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
                background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: '6px',
                textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              Book a Repair
            </Link>
          </div>
        </div>
      </section>

      {/* ── Intro + Repair Types ── */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>About {page.model} Repair</h2>
              <p style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>{page.intro}</p>

              <h3 style={{ marginTop: '2rem' }}>Repair Services &amp; Estimated Times</h3>
              <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem' }}>
                  <thead>
                    <tr style={{ background: '#1B3A5C', color: '#fff' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left' }}>Repair Type</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left' }}>Est. Time</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left' }}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.repairTypes.map((rt, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#fff', borderBottom: '1px solid #e9ecef' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 500 }}>{rt.name}</td>
                        <td style={{ padding: '12px 16px' }}>{rt.time}</td>
                        <td style={{ padding: '12px 16px', color: '#FF5600', fontWeight: 600 }}>{rt.priceRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ marginTop: '2.5rem' }}>Common {page.model} Issues We Fix</h3>
              <div className="row" style={{ marginTop: '1rem' }}>
                {page.commonIssues.map((issue, i) => (
                  <div key={i} className="col-md-6" style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#FF5600', fontWeight: 700 }}>✓</span>
                      <span>{issue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="col-lg-4">
              <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '1.5rem', position: 'sticky', top: '100px' }}>
                <h4 style={{ color: '#1B3A5C', marginBottom: '0.75rem' }}>Device Specs</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#555' }}>{page.specs}</p>
                <hr />
                <h5 style={{ color: '#1B3A5C', marginBottom: '0.5rem' }}>Warranty</h5>
                <p style={{ fontSize: '0.93rem', lineHeight: 1.6 }}>{page.warrantyNote}</p>
                <hr />
                <h5 style={{ color: '#1B3A5C', marginBottom: '0.5rem' }}>Why Mobile Armour?</h5>
                <ul style={{ paddingLeft: '1.1rem', fontSize: '0.93rem', lineHeight: 1.8 }}>
                  <li>Same-day service available</li>
                  <li>6-month warranty on all repairs</li>
                  <li>Certified experienced technicians</li>
                  <li>Warringal Shopping Centre location</li>
                  <li>No fix, no fee guarantee</li>
                </ul>
                <hr />
                <Link
                  href="tel:0405326205"
                  style={{
                    display: 'block', textAlign: 'center', padding: '14px', background: '#FF5600',
                    color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
                  }}
                >
                  Call for Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#f8f9fa', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '2.5rem' }}>
            {page.model} Repair — Frequently Asked Questions
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {page.faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff', borderRadius: '10px', padding: '1.5rem 2rem',
                    marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <h4 style={{ color: '#1B3A5C', fontSize: '1.1rem', marginBottom: '0.75rem' }}>{faq.question}</h4>
                  <p style={{ lineHeight: 1.7, margin: 0 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Models (Same Brand) ── */}
      {relatedModels.length > 0 && (
        <section style={{ padding: '3rem 0' }}>
          <div className="container text-center">
            <h3 style={{ marginBottom: '1.5rem' }}>Other {brandLabel} Repairs</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
              {relatedModels.map((m) => (
                <Link
                  key={m.slug}
                  href={`/repairs/${m.slug}`}
                  style={{
                    background: '#f0f4f8', color: '#1B3A5C', padding: '0.5rem 1.2rem',
                    borderRadius: '6px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500,
                  }}
                >
                  {m.model}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Service Areas ── */}
      <section style={{ background: '#f0f4f8', padding: '3rem 0' }}>
        <div className="container text-center">
          <h3 style={{ marginBottom: '1.5rem' }}>{page.model} Repair — Serving Melbourne&apos;s Northern Suburbs</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {locationPages.map((loc) => (
              <Link
                key={loc.slug}
                href={`/phone-repair/${loc.slug}`}
                style={{
                  background: '#fff', color: '#1B3A5C', padding: '0.4rem 0.9rem',
                  borderRadius: '20px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
                  border: '1px solid #dde3ea',
                }}
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Repair Services ── */}
      <section style={{ background: '#1B3A5C', color: '#fff', padding: '3rem 0' }}>
        <div className="container text-center">
          <h3 style={{ marginBottom: '1.5rem' }}>All Repair Services</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {servicePages.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                style={{
                  background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '0.5rem 1rem',
                  borderRadius: '6px', textDecoration: 'none', fontSize: '0.95rem',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

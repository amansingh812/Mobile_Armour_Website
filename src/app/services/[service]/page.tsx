import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servicePages, getServiceBySlug, getAllServiceSlugs } from '@/data/service-pages';
import { locationPages } from '@/data/location-pages';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ service: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://www.mobilearmour.com.au/services/${slug}`,
      siteName: 'Mobile Armour',
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title + ' - Mobile Armour Heidelberg',
      description: service.metaDescription,
    },
    alternates: {
      canonical: `https://www.mobilearmour.com.au/services/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.intro,
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
    url: `https://www.mobilearmour.com.au/services/${slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: service.title },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #2d5a8c 100%)', color: '#fff' }}>
        <div className="container">
          <nav aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
            <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', opacity: 0.85 }}>
              <li><Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link> /</li>
              <li><Link href="/services" style={{ color: '#fff', textDecoration: 'none' }}>Services</Link> /</li>
              <li style={{ color: '#FF5600' }}>{service.title}</li>
            </ol>
          </nav>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            {service.heroHeading}
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', opacity: 0.9 }}>
            {service.heroSubheading}
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="tel:0405326205" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
              background: '#FF5600', color: '#fff', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 600, fontSize: '1.05rem'
            }}>
              Get Instant Quote — 0405-326-205
            </Link>
          </div>
        </div>
      </section>

      {/* Intro + Process */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>About Our {service.title} Service</h2>
              <p style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>{service.intro}</p>

              <h3 style={{ marginTop: '2rem' }}>Our Repair Process</h3>
              <div style={{ marginTop: '1rem' }}>
                {service.processSteps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                    <div style={{
                      minWidth: '40px', height: '40px', borderRadius: '50%', background: '#FF5600',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '1.1rem'
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ margin: 0, lineHeight: 1.7, fontSize: '1.02rem' }}>{step}</p>
                  </div>
                ))}
              </div>

              {/* Common Issues */}
              <h3 style={{ marginTop: '2rem' }}>Common Issues We Fix</h3>
              <div className="row" style={{ marginTop: '1rem' }}>
                {service.commonIssues.map((issue, i) => (
                  <div key={i} className="col-md-6" style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#FF5600', fontWeight: 700 }}>✓</span>
                      <span>{issue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '1.5rem', position: 'sticky', top: '100px' }}>
                <h4 style={{ color: '#1B3A5C', marginBottom: '1rem' }}>Supported Models</h4>
                <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  {service.models.slice(0, 12).map((model, i) => (
                    <li key={i}>{model}</li>
                  ))}
                  {service.models.length > 12 && <li>...and more</li>}
                </ul>
                <hr />
                <h5 style={{ color: '#1B3A5C', marginBottom: '0.5rem' }}>Warranty</h5>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{service.warrantyNote}</p>
                <hr />
                <Link href="tel:0405326205" style={{
                  display: 'block', textAlign: 'center', padding: '12px', background: '#FF5600',
                  color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 600
                }}>
                  Call for Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ background: '#f8f9fa', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '2.5rem' }}>
            {service.title} — Frequently Asked Questions
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {service.faqs.map((faq, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: '10px', padding: '1.5rem 2rem',
                  marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                }}>
                  <h4 style={{ color: '#1B3A5C', fontSize: '1.1rem', marginBottom: '0.75rem' }}>{faq.question}</h4>
                  <p style={{ lineHeight: 1.7, margin: 0 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding">
        <div className="container text-center">
          <h3 style={{ marginBottom: '1.5rem' }}>Available Across Melbourne&apos;s Northern Suburbs</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {locationPages.map((loc) => (
              <Link
                key={loc.slug}
                href={`/phone-repair/${loc.slug}`}
                style={{
                  background: '#f0f4f8', color: '#1B3A5C', padding: '0.4rem 0.9rem',
                  borderRadius: '20px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500
                }}
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section style={{ background: '#1B3A5C', color: '#fff', padding: '3rem 0' }}>
        <div className="container text-center">
          <h3 style={{ marginBottom: '1.5rem' }}>Other Repair Services</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {servicePages
              .filter((s) => s.slug !== slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  style={{
                    background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '0.5rem 1rem',
                    borderRadius: '6px', textDecoration: 'none', fontSize: '0.95rem',
                    border: '1px solid rgba(255,255,255,0.2)'
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

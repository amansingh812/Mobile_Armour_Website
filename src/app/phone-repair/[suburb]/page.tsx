import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locationPages, getSuburbBySlug, getAllSuburbSlugs } from '@/data/location-pages';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

interface PageProps {
  params: Promise<{ suburb: string }>;
}

export async function generateStaticParams() {
  return getAllSuburbSlugs().map((slug) => ({ suburb: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { suburb: slug } = await params;
  const suburb = getSuburbBySlug(slug);
  if (!suburb) return { title: 'Location Not Found' };

  const title = `Phone Repair ${suburb.name} | Mobile Armour - Same Day Service`;
  const description = `Expert phone repair near ${suburb.name} VIC ${suburb.postcode}. iPhone, Samsung, iPad & Apple Watch repair. ${suburb.driveTime} from ${suburb.name} to our Heidelberg store. 6-month warranty, same-day service.`;

  return {
    title,
    description,
    keywords: [
      `phone repair ${suburb.name.toLowerCase()}`,
      `iphone repair ${suburb.name.toLowerCase()}`,
      `samsung repair ${suburb.name.toLowerCase()}`,
      `screen repair near ${suburb.name.toLowerCase()}`,
      `mobile repair ${suburb.name.toLowerCase()}`,
      `phone repair near me ${suburb.name.toLowerCase()}`,
      `ipad repair ${suburb.name.toLowerCase()}`,
      `battery replacement ${suburb.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://www.mobilearmour.com.au/phone-repair/${slug}`,
      siteName: 'Mobile Armour',
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Phone Repair ${suburb.name} - Mobile Armour`,
      description,
    },
    alternates: {
      canonical: `https://www.mobilearmour.com.au/phone-repair/${slug}`,
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

export default async function SuburbPage({ params }: PageProps) {
  const { suburb: slug } = await params;
  const suburb = getSuburbBySlug(slug);
  if (!suburb) notFound();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Mobile Armour',
    image: 'https://www.mobilearmour.com.au/img/og-image.jpg',
    url: 'https://www.mobilearmour.com.au',
    telephone: '+61405326205',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kiosk 4, Warringal Shopping Centre, 56 Burgundy Street',
      addressLocality: 'Heidelberg',
      addressRegion: 'VIC',
      postalCode: '3084',
      addressCountry: 'AU',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: suburb.lat,
        longitude: suburb.lng,
      },
      geoRadius: '20000',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: suburb.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const services = [
    { name: 'iPhone Screen Repair', href: '/services/iphone-screen-repair', icon: '📱' },
    { name: 'iPhone Battery Replacement', href: '/services/iphone-battery-replacement', icon: '🔋' },
    { name: 'Samsung Repair', href: '/services/samsung-repair', icon: '📲' },
    { name: 'iPad Repair', href: '/services/ipad-screen-repair', icon: '📋' },
    { name: 'Apple Watch Repair', href: '/services/apple-watch-repair', icon: '⌚' },
    { name: 'MacBook & Laptop', href: '/services/macbook-laptop-repair', icon: '💻' },
  ];

  return (
    <div>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Phone Repair', url: '/phone-repair' },
        { name: suburb.name },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #2d5a8c 100%)', color: '#fff' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <nav aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
                <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', opacity: 0.85 }}>
                  <li><Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link> /</li>
                  <li><Link href="/phone-repair" style={{ color: '#fff', textDecoration: 'none' }}>Phone Repair</Link> /</li>
                  <li style={{ color: '#FF5600' }}>{suburb.name}</li>
                </ol>
              </nav>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                Phone Repair {suburb.name}
              </h1>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '700px' }}>
                Expert mobile repair for {suburb.name} residents — just {suburb.driveTime} from your area.
                iPhone, Samsung, iPad & Apple Watch repair with 6-month warranty.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <Link href="tel:0405326205" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
                  background: '#FF5600', color: '#fff', borderRadius: '6px', textDecoration: 'none',
                  fontWeight: 600, fontSize: '1.05rem'
                }}>
                  Call 0405-326-205
                </Link>
                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
                  background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: '6px',
                  textDecoration: 'none', fontWeight: 600, border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  Get Free Quote
                </Link>
              </div>
            </div>
            <div className="col-lg-4 text-center" style={{ marginTop: '2rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '2rem' }}>
                <p style={{ fontSize: '3rem', fontWeight: 800, color: '#FF5600', margin: 0 }}>{suburb.distance}</p>
                <p style={{ margin: '0.25rem 0 0', opacity: 0.9 }}>from {suburb.name} to our store</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '0.5rem' }}>{suburb.driveTime} drive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>Mobile Phone Repair Near {suburb.name}</h2>
              <p style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>{suburb.intro}</p>

              <h3 style={{ marginTop: '2rem' }}>Our Services for {suburb.name} Residents</h3>
              <p style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>{suburb.serviceHighlights}</p>

              <h3 style={{ marginTop: '2rem' }}>Why {suburb.name} Locals Choose Mobile Armour</h3>
              <p style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>{suburb.whyChooseUs}</p>
            </div>
            <div className="col-lg-4">
              <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '1.5rem', marginTop: '1rem', position: 'sticky', top: '100px' }}>
                <h4 style={{ color: '#1B3A5C', marginBottom: '1rem' }}>Quick Info</h4>
                <p><strong>Distance:</strong> {suburb.distance} from {suburb.name}</p>
                <p><strong>Drive time:</strong> {suburb.driveTime}</p>
                <p><strong>Address:</strong> Kiosk 4, Warringal Shopping Centre, 56 Burgundy St, Heidelberg VIC 3084</p>
                <p><strong>Phone:</strong> <Link href="tel:0405326205" style={{ color: '#FF5600', fontWeight: 600 }}>0405-326-205</Link></p>
                <p><strong>Hours:</strong> Mon-Sun 9:30am - 5:30pm</p>
                <hr />
                <h5 style={{ color: '#1B3A5C', marginBottom: '0.75rem' }}>Also serving:</h5>
                <p style={{ fontSize: '0.95rem' }}>{suburb.nearbySuburbs.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ background: '#f8f9fa', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '2.5rem' }}>Repair Services Available for {suburb.name}</h2>
          <div className="row g-4">
            {services.map((svc) => (
              <div key={svc.href} className="col-lg-4 col-md-6">
                <Link href={svc.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    background: '#fff', borderRadius: '12px', padding: '2rem', textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s',
                    height: '100%'
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>{svc.icon}</span>
                    <h4 style={{ color: '#1B3A5C', marginTop: '1rem' }}>{svc.name}</h4>
                    <p style={{ color: '#FF5600', fontWeight: 600, marginTop: '0.5rem' }}>Learn More →</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '2.5rem' }}>
            Phone Repair {suburb.name} — Frequently Asked Questions
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {suburb.faqs.map((faq, i) => (
                <div key={i} style={{
                  background: '#f8f9fa', borderRadius: '10px', padding: '1.5rem 2rem',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ color: '#1B3A5C', fontSize: '1.1rem', marginBottom: '0.75rem' }}>{faq.question}</h4>
                  <p style={{ lineHeight: 1.7, margin: 0, fontSize: '1rem' }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Locations */}
      <section style={{ background: '#1B3A5C', color: '#fff', padding: '3rem 0' }}>
        <div className="container text-center">
          <h3 style={{ marginBottom: '1.5rem' }}>We Also Serve</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {locationPages
              .filter((loc) => loc.slug !== slug)
              .map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/phone-repair/${loc.slug}`}
                  style={{
                    background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '0.5rem 1rem',
                    borderRadius: '6px', textDecoration: 'none', fontSize: '0.95rem',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {loc.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding text-center">
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>Ready to Get Your Device Fixed?</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            {suburb.name} residents — call us now for a free quote or drop in to Warringal Shopping Centre.
            Most repairs completed in 30-60 minutes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="tel:0405326205" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
              background: '#FF5600', color: '#fff', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 600, fontSize: '1.05rem'
            }}>
              Call 0405-326-205
            </Link>
            <Link href="/price" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
              background: '#1B3A5C', color: '#fff', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 600
            }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

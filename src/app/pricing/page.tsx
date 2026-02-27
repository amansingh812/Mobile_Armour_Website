import { Metadata } from 'next';
import Link from 'next/link';
import { modelRepairPages, getModelsByBrand } from '@/data/model-repair-pages';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Phone Repair Prices Melbourne | Mobile Armour Heidelberg',
  description:
    'Mobile phone repair pricing in Heidelberg Melbourne. iPhone, Samsung, Google Pixel, iPad screen repair & battery replacement costs. Same-day service, 6-month warranty at Warringal Shopping Centre.',
  keywords: [
    'phone repair cost melbourne',
    'iphone screen repair price',
    'samsung screen repair cost',
    'iphone battery replacement price',
    'phone repair pricing heidelberg',
    'how much does phone screen repair cost',
    'mobile phone repair price list',
    'ipad screen repair cost',
    'google pixel repair cost melbourne',
    'screen replacement cost australia',
  ],
  openGraph: {
    title: 'Phone Repair Prices - Mobile Armour Heidelberg',
    description: 'Transparent phone repair pricing. iPhone, Samsung, iPad, Pixel repair costs.',
    url: 'https://www.mobilearmour.com.au/pricing',
    siteName: 'Mobile Armour',
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.mobilearmour.com.au/pricing',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function PricingPage() {
  const iphones = getModelsByBrand('apple');
  const samsungs = getModelsByBrand('samsung');
  const pixels = getModelsByBrand('google');
  const ipads = getModelsByBrand('ipad');

  const pricingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mobile Phone Repair',
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
    url: 'https://www.mobilearmour.com.au/pricing',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does phone screen repair cost in Melbourne?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Phone screen repair costs in Melbourne vary by device model. iPhone screen repairs typically range from affordable for older models to premium for latest Pro Max models. Samsung and Google Pixel repairs are competitively priced. Contact Mobile Armour at 0405-326-205 for an exact quote for your device.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is phone repair cheaper than buying a new phone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Almost always, yes. Screen repair or battery replacement typically costs a fraction of a new phone. For example, repairing a 2-year-old phone can extend its life by another 2-3 years, making repair significantly more cost-effective than replacement.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer free quotes for phone repair?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Mobile Armour provides free diagnostic assessments and no-obligation quotes. Call 0405-326-205 or walk into our Warringal Shopping Centre location in Heidelberg for an instant, free quote.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Mobile Armour price match competitors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer highly competitive pricing that is typically lower than official Apple and Samsung service centres. We pride ourselves on fair, transparent pricing with no hidden fees. All repairs include our 6-month warranty.',
        },
      },
    ],
  };

  const brandGroups = [
    { label: 'iPhone Repair Prices', devices: iphones, color: '#333' },
    { label: 'Samsung Repair Prices', devices: samsungs, color: '#1428a0' },
    { label: 'Google Pixel Repair Prices', devices: pixels, color: '#4285F4' },
    { label: 'iPad Repair Prices', devices: ipads, color: '#555' },
  ];

  return (
    <div>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Pricing' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #2d5a8c 100%)', color: '#fff', padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <nav aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
            <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', opacity: 0.85 }}>
              <li><Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link> /</li>
              <li style={{ color: '#FF5600' }}>Repair Prices</li>
            </ol>
          </nav>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Phone Repair Prices Melbourne
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: '700px', opacity: 0.9 }}>
            Transparent pricing for all device repairs — free quotes, no hidden fees, 6-month warranty included
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="tel:0405326205" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
              background: '#FF5600', color: '#fff', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 600, fontSize: '1.05rem',
            }}>
              Get Free Quote — 0405-326-205
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ background: '#f8f9fa', padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', fontSize: '0.95rem', color: '#1B3A5C', fontWeight: 500 }}>
            <span>✓ Free Diagnostic</span>
            <span>✓ No Fix, No Fee</span>
            <span>✓ 6-Month Warranty</span>
            <span>✓ Same-Day Service</span>
            <span>✓ No Hidden Fees</span>
          </div>
        </div>
      </section>

      {/* Pricing tables per brand */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '800px', marginBottom: '2.5rem' }}>
            Repair costs depend on your specific device model, the type of repair needed, and the parts required. Below is a guide to the repair services we offer for each device. For an exact price, call us on{' '}
            <Link href="tel:0405326205" style={{ color: '#FF5600', fontWeight: 600, textDecoration: 'none' }}>
              0405-326-205
            </Link>{' '}
            or visit our Warringal Shopping Centre location for a free, no-obligation quote.
          </p>

          {brandGroups.map((group) => (
            <div key={group.label} style={{ marginBottom: '3rem' }}>
              <h2 style={{ color: '#1B3A5C', fontSize: '1.6rem', marginBottom: '1.25rem', borderBottom: '3px solid #FF5600', paddingBottom: '0.5rem', display: 'inline-block' }}>
                {group.label}
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                  <thead>
                    <tr style={{ background: '#1B3A5C', color: '#fff' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left' }}>Device</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left' }}>Repair Services</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center' }}>Est. Time</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center' }}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.devices.map((device) =>
                      device.repairTypes.map((rt, ri) => (
                        <tr
                          key={`${device.slug}-${ri}`}
                          style={{
                            background: ri % 2 === 0 ? '#f8f9fa' : '#fff',
                            borderBottom: '1px solid #e9ecef',
                          }}
                        >
                          {ri === 0 && (
                            <td
                              rowSpan={device.repairTypes.length}
                              style={{
                                padding: '12px 16px',
                                fontWeight: 600,
                                verticalAlign: 'top',
                                borderRight: '1px solid #e9ecef',
                              }}
                            >
                              <Link
                                href={`/repairs/${device.slug}`}
                                style={{ color: '#1B3A5C', textDecoration: 'none' }}
                              >
                                {device.model}
                              </Link>
                            </td>
                          )}
                          <td style={{ padding: '10px 16px' }}>{rt.name}</td>
                          <td style={{ padding: '10px 16px', textAlign: 'center' }}>{rt.time}</td>
                          <td style={{ padding: '10px 16px', textAlign: 'center', color: '#FF5600', fontWeight: 600 }}>
                            {rt.priceRange}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#f8f9fa', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '2.5rem' }}>
            Pricing — Frequently Asked Questions
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {[
                {
                  q: 'How much does phone screen repair cost in Melbourne?',
                  a: 'Screen repair costs vary by device model and screen technology (OLED vs LCD). Newer flagship models with OLED displays cost more than mid-range or older devices. We offer competitive pricing below official Apple and Samsung service centre rates. Call 0405-326-205 for an instant quote for your specific model.',
                },
                {
                  q: 'Is phone repair cheaper than buying a new phone?',
                  a: 'Almost always, yes. Repairing a cracked screen or replacing a battery costs a fraction of a new device. For example, a screen repair on a 2-year-old phone can extend its useful life by another 2-3 years — saving you hundreds of dollars compared to buying new.',
                },
                {
                  q: 'Do you offer free quotes?',
                  a: 'Yes! Walk in to our Warringal Shopping Centre location in Heidelberg for a free diagnostic assessment and no-obligation quote. Or call 0405-326-205 for an instant phone quote. There are never any diagnostic fees.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept cash, Visa, Mastercard, EFTPOS, Apple Pay, Google Pay, and bank transfer. Payment is taken after the repair is completed to your satisfaction.',
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff', borderRadius: '10px', padding: '1.5rem 2rem',
                    marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <h4 style={{ color: '#1B3A5C', fontSize: '1.1rem', marginBottom: '0.75rem' }}>{faq.q}</h4>
                  <p style={{ lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#FF5600', color: '#fff', padding: '3rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Ready to Get Your Device Fixed?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', opacity: 0.95 }}>
            Walk in to Warringal Shopping Centre, Heidelberg — or call for a free quote
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="tel:0405326205" style={{
              padding: '14px 32px', background: '#fff', color: '#FF5600', borderRadius: '6px',
              textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem',
            }}>
              Call 0405-326-205
            </Link>
            <Link href="/contact" style={{
              padding: '14px 32px', background: 'transparent', color: '#fff', borderRadius: '6px',
              textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem',
              border: '2px solid rgba(255,255,255,0.8)',
            }}>
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

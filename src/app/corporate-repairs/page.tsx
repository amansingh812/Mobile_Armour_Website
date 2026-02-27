import { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Corporate & Business Phone Repair Melbourne | Mobile Armour',
  description:
    'Corporate mobile device repair services for Melbourne businesses. Bulk iPhone, iPad, Samsung repair. Priority turnaround, volume pricing, fleet management. Warringal Shopping Centre, Heidelberg.',
  keywords: [
    'corporate phone repair melbourne',
    'business phone repair',
    'bulk phone repair melbourne',
    'corporate iphone repair',
    'corporate ipad repair',
    'business device repair melbourne',
    'fleet phone repair',
    'corporate mobile device management',
    'office phone repair service',
    'bulk device repair australia',
  ],
  openGraph: {
    title: 'Corporate & Business Phone Repair - Mobile Armour Melbourne',
    description: 'Professional device repair for businesses. Bulk pricing, priority service, fleet management.',
    url: 'https://www.mobilearmour.com.au/corporate-repairs',
    siteName: 'Mobile Armour',
    locale: 'en_AU',
    type: 'website',
  },
  alternates: { canonical: 'https://www.mobilearmour.com.au/corporate-repairs' },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function CorporateRepairsPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Corporate & Business Device Repair',
    description: 'Professional mobile device repair services for businesses in Melbourne. Bulk repair, priority turnaround, volume pricing.',
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
    url: 'https://www.mobilearmour.com.au/corporate-repairs',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you offer bulk phone repair for businesses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Mobile Armour provides volume repair services for businesses of all sizes. Whether you need 5 devices repaired or 50, we offer competitive bulk pricing with priority turnaround times.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast is corporate device repair turnaround?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Corporate clients receive priority scheduling. Most individual device repairs are completed same-day. For bulk orders, we provide a detailed timeline upfront, typically completing batches within 1-3 business days depending on volume and repair complexity.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide on-site repair for offices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For large volume jobs, we can arrange on-site repair at your Melbourne office. Contact us at 0405-326-205 to discuss your requirements and we will tailor a service plan.',
        },
      },
    ],
  };

  const benefits = [
    { title: 'Volume Pricing', desc: 'Competitive bulk rates for businesses repairing multiple devices. The more devices, the better the rate.' },
    { title: 'Priority Turnaround', desc: 'Corporate clients receive same-day priority scheduling. Most repairs completed within hours, not days.' },
    { title: 'Account Management', desc: 'Dedicated point of contact for your business. Streamlined ordering, invoicing, and device tracking.' },
    { title: 'Tax Invoice & ABN', desc: 'Professional invoicing with ABN for business expense claims. GST-inclusive pricing with clear breakdowns.' },
    { title: 'Fleet Management', desc: 'Ongoing maintenance plans for businesses with company-owned devices. Scheduled servicing and repair tracking.' },
    { title: 'Data Security', desc: 'Strict data handling protocols. All repairs performed in-house — your devices never leave our premises.' },
  ];

  const industries = [
    'Real estate agencies',
    'Retail stores & chains',
    'Medical practices & clinics',
    'Schools & educational institutions',
    'Construction companies',
    'Hospitality & restaurants',
    'Logistics & transport companies',
    'Accounting & law firms',
    'Not-for-profit organisations',
    'Government departments',
  ];

  return (
    <div>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Corporate Repairs' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #2d5a8c 100%)', color: '#fff', padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <nav aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
            <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', opacity: 0.85 }}>
              <li><Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link> /</li>
              <li style={{ color: '#FF5600' }}>Corporate Repairs</li>
            </ol>
          </nav>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Corporate &amp; Business Device Repair
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: '700px', opacity: 0.9 }}>
            Professional mobile device repair for Melbourne businesses — bulk pricing, priority turnaround, and dedicated account management
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="tel:0405326205" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
              background: '#FF5600', color: '#fff', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 600, fontSize: '1.05rem',
            }}>
              Discuss Your Needs — 0405-326-205
            </Link>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
              background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: '6px',
              textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem',
              border: '1px solid rgba(255,255,255,0.3)',
            }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>Mobile Device Repair for Your Business</h2>
              <p style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                When your team&apos;s phones and tablets break, productivity stops. Mobile Armour provides professional corporate repair services designed to get your business devices back in action fast. Whether your company has 5 iPhones or 50 iPads, we offer volume pricing, priority scheduling, and a dedicated account manager to handle your repairs seamlessly.
              </p>
              <p style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                Based at Warringal Shopping Centre in Heidelberg, we serve businesses across Melbourne&apos;s northern suburbs and beyond. Our technicians handle iPhones, iPads, Samsung Galaxy devices, Google Pixels, MacBooks, and laptops — everything your workforce relies on daily. All repairs are performed in-house with strict data security protocols, and every job comes with our 6-month warranty.
              </p>

              <h3 style={{ marginTop: '2.5rem' }}>Devices We Repair for Businesses</h3>
              <div className="row" style={{ marginTop: '1rem' }}>
                {[
                  'iPhones (all models)',
                  'iPads & iPad Pro',
                  'Samsung Galaxy phones & tablets',
                  'Google Pixel devices',
                  'MacBooks & Apple laptops',
                  'Windows laptops',
                  'Apple Watch',
                  'Screen protector installation (bulk)',
                ].map((device, i) => (
                  <div key={i} className="col-md-6" style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#FF5600', fontWeight: 700 }}>✓</span>
                      <span>{device}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '1.5rem', position: 'sticky', top: '100px' }}>
                <h4 style={{ color: '#1B3A5C', marginBottom: '1rem' }}>Quick Facts</h4>
                <ul style={{ paddingLeft: '1.1rem', fontSize: '0.95rem', lineHeight: 2 }}>
                  <li>Volume pricing from 3+ devices</li>
                  <li>Same-day priority turnaround</li>
                  <li>Tax invoice with ABN provided</li>
                  <li>6-month warranty on all repairs</li>
                  <li>In-house repairs only (data secure)</li>
                  <li>Ongoing fleet maintenance available</li>
                  <li>Serving Melbourne metro area</li>
                </ul>
                <hr />
                <Link href="tel:0405326205" style={{
                  display: 'block', textAlign: 'center', padding: '14px', background: '#FF5600',
                  color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
                }}>
                  Call to Discuss
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ background: '#f8f9fa', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '2.5rem' }}>Why Businesses Choose Mobile Armour</h2>
          <div className="row">
            {benefits.map((b, i) => (
              <div key={i} className="col-md-6 col-lg-4" style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  background: '#fff', borderRadius: '10px', padding: '1.5rem',
                  height: '100%', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}>
                  <h4 style={{ color: '#1B3A5C', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{b.title}</h4>
                  <p style={{ margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '2rem' }}>Industries We Serve</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="row">
                {industries.map((ind, i) => (
                  <div key={i} className="col-md-6" style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#FF5600', fontWeight: 700 }}>✓</span>
                      <span style={{ fontSize: '1rem' }}>{ind}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#f8f9fa', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '2.5rem' }}>Corporate Repair — FAQ</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {[
                { q: 'Do you offer bulk phone repair for businesses?', a: 'Yes. Whether you need 3 devices repaired or 30, we provide competitive volume pricing with priority turnaround. Contact us to discuss your specific requirements.' },
                { q: 'How fast is corporate repair turnaround?', a: 'Corporate clients get priority scheduling. Most individual repairs are same-day. For bulk batches, we typically complete within 1-3 business days depending on volume and complexity.' },
                { q: 'Can you repair devices on-site at our office?', a: 'For larger volumes, we can arrange on-site repair at your Melbourne office. Call 0405-326-205 to discuss logistics and we\'ll tailor a plan.' },
                { q: 'How do you handle data security?', a: 'All repairs are performed in-house at our Heidelberg location — devices never leave our secured premises. Our technicians follow strict data handling protocols and can sign NDAs if required.' },
              ].map((faq, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: '10px', padding: '1.5rem 2rem',
                  marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}>
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
          <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Let&apos;s Talk About Your Business Repair Needs</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', opacity: 0.95 }}>
            Call us today for a free consultation and volume pricing quote
          </p>
          <Link href="tel:0405326205" style={{
            padding: '14px 32px', background: '#fff', color: '#FF5600', borderRadius: '6px',
            textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem',
          }}>
            Call 0405-326-205
          </Link>
        </div>
      </section>
    </div>
  );
}

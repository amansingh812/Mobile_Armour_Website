import { Metadata } from 'next';
import Link from 'next/link';
import { locationPages } from '@/data/location-pages';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Phone Repair Service Areas Melbourne | Mobile Armour Heidelberg',
  description: 'Mobile Armour serves Melbourne northern suburbs for phone repair. Greensborough, Preston, Doncaster, Eltham, Bundoora, Ivanhoe, Rosanna & more. Same-day service, 6-month warranty.',
  keywords: [
    'phone repair melbourne northern suburbs',
    'mobile repair near me melbourne',
    'phone repair heidelberg service area',
    'iphone repair melbourne north',
    'samsung repair melbourne suburbs',
  ],
  openGraph: {
    title: 'Phone Repair Service Areas - Mobile Armour Melbourne',
    description: 'Serving 15+ Melbourne suburbs for expert phone, tablet, and smartwatch repair.',
    url: 'https://www.mobilearmour.com.au/phone-repair',
    siteName: 'Mobile Armour',
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.mobilearmour.com.au/phone-repair',
  },
  robots: { index: true, follow: true },
};

export default function PhoneRepairHub() {
  return (
    <div>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Phone Repair Service Areas' },
      ]} />

      {/* Hero */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #2d5a8c 100%)', color: '#fff' }}>
        <div className="container text-center">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Phone Repair Service Areas
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
            Mobile Armour at Warringal Shopping Centre, Heidelberg, serves all of Melbourne&apos;s
            northern suburbs. Find your suburb below for location-specific repair information.
          </p>
        </div>
      </section>

      {/* Suburbs Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            {locationPages.map((suburb) => (
              <div key={suburb.slug} className="col-lg-4 col-md-6">
                <Link href={`/phone-repair/${suburb.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    background: '#fff', border: '1px solid #e9ecef', borderRadius: '12px',
                    padding: '1.75rem', transition: 'box-shadow 0.2s, transform 0.2s',
                    height: '100%'
                  }}>
                    <h3 style={{ color: '#1B3A5C', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      Phone Repair {suburb.name}
                    </h3>
                    <p style={{ color: '#666', fontSize: '0.95rem', margin: '0.25rem 0' }}>
                      {suburb.postcode} — {suburb.distance} away
                    </p>
                    <p style={{ color: '#333', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '0.75rem' }}>
                      {suburb.driveTime} drive from {suburb.name}. Serving {suburb.nearbySuburbs.slice(0, 3).join(', ')} & more.
                    </p>
                    <span style={{ color: '#FF5600', fontWeight: 600, fontSize: '0.95rem' }}>
                      View Details →
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#f8f9fa', padding: '3rem 0' }}>
        <div className="container text-center">
          <h2 style={{ marginBottom: '1rem' }}>Don&apos;t See Your Suburb?</h2>
          <p style={{ fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            We serve all of Melbourne. If your suburb isn&apos;t listed, give us a call — we&apos;re happy to help!
          </p>
          <Link href="tel:0405326205" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
            background: '#FF5600', color: '#fff', borderRadius: '6px', textDecoration: 'none',
            fontWeight: 600, fontSize: '1.05rem'
          }}>
            Call 0405-326-205
          </Link>
        </div>
      </section>
    </div>
  );
}

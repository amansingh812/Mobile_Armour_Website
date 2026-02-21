const BASE_URL = 'https://www.mobilearmour.com.au';

const services = [
  {
    name: 'iPhone Screen Repair',
    description: 'Professional iPhone screen replacement service in Heidelberg. Cracked screen, LCD damage, and touch issues fixed same-day with quality parts and 6-month warranty.',
    url: `${BASE_URL}/services`,
  },
  {
    name: 'Samsung Screen Repair',
    description: 'Expert Samsung Galaxy screen repair at Warringal Shopping Centre. AMOLED and LCD screen replacement for all Samsung models with same-day service.',
    url: `${BASE_URL}/services`,
  },
  {
    name: 'Battery Replacement',
    description: 'Mobile phone battery replacement in Heidelberg Melbourne. iPhone and Samsung battery swap completed in 30-60 minutes with genuine quality parts.',
    url: `${BASE_URL}/services`,
  },
  {
    name: 'iPad Repair',
    description: 'iPad screen repair and diagnostics in Heidelberg. Cracked glass, LCD replacement, and charging port repair for all iPad models.',
    url: `${BASE_URL}/services`,
  },
  {
    name: 'Water Damage Repair',
    description: 'Emergency water damage repair for smartphones in Heidelberg. Ultrasonic cleaning, component-level diagnostics, and data recovery services.',
    url: `${BASE_URL}/services`,
  },
  {
    name: 'Charging Port Repair',
    description: 'Phone charging port replacement in Heidelberg Melbourne. Fix loose connections, slow charging, and USB-C or Lightning port issues same-day.',
    url: `${BASE_URL}/services`,
  },
  {
    name: 'Apple Watch Screen Repair',
    description: 'Professional Apple Watch screen replacement in Heidelberg. We fix cracked and damaged displays for all Apple Watch Series — Ultra, Series 9, 8, 7, 6, SE and older models. Same-day service with quality parts and warranty.',
    url: `${BASE_URL}/services`,
  },
  {
    name: 'Apple Watch Battery Replacement',
    description: 'Apple Watch battery replacement in Heidelberg Melbourne. Restore all-day battery life with a fast, reliable battery swap for all Apple Watch Series at Warringal Shopping Centre.',
    url: `${BASE_URL}/services`,
  },
];

export default function ServiceSchema() {
  const schema = services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Mobile Armour',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Warringal Shopping Centre',
        addressLocality: 'Heidelberg',
        addressRegion: 'VIC',
        postalCode: '3084',
        addressCountry: 'AU',
      },
      telephone: '+61405326205',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -37.7547,
        longitude: 145.0603,
      },
      geoRadius: '20000',
    },
    serviceType: 'Mobile Phone Repair',
  }));

  return (
    <>
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

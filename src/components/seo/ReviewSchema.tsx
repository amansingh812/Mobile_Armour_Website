import { Testimonial1CardData } from '@/data/testimonial1-card-seeds';

export default function ReviewSchema() {
  const reviews = Testimonial1CardData.map((t, i) => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: t.name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.rating || 5,
      bestRating: 5,
    },
    reviewBody: t.comment,
  }));

  const avgRating =
    Testimonial1CardData.reduce((sum, t) => sum + (t.rating || 5), 0) /
    Testimonial1CardData.length;

  const schema = {
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: Testimonial1CardData.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

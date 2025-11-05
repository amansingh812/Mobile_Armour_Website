"use client";

import Script from "next/script";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://mobilearmour.com.au/#business",
    "name": "Mobile Armour",
    "image": "https://mobilearmour.com.au/logo.png",
    "description": "Expert mobile phone repair services in Heidelberg. Specializing in iPhone repair, iPad repair, LCD screen replacement, battery replacement, and phone accessories.",
    "url": "https://mobilearmour.com.au",
    "telephone": "+61-XXX-XXX-XXX",
    "email": "repair@mobilearmour.com.au",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kiosk 4 Warringal Shopping Centre",
      "addressLocality": "Heidelberg",
      "addressRegion": "VIC",
      "postalCode": "3084",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -37.7547,
      "longitude": 145.0603
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:30",
        "closes": "17:30"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "currenciesAccepted": "AUD",
    "areaServed": {
      "@type": "City",
      "name": "Heidelberg"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mobile Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile Phone Repair",
            "description": "Expert mobile phone repair services including screen replacement, battery replacement, and hardware fixes"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "iPad Repair",
            "description": "Professional iPad repair services for all models including screen and battery replacement"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "LCD Screen Repair",
            "description": "High-quality LCD screen replacement for smartphones and tablets"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Battery Replacement",
            "description": "Fast battery replacement service for all mobile devices"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Phone Accessories",
            "description": "Wide range of phone cases, screen protectors, chargers, and cables"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/people/Mobile-Armour/61577763766480/",
      "https://www.instagram.com/mobilearm0ur/",
      "https://tiktok.com/@mobilearmourau"
    ]
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

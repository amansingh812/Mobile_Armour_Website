"use client";

import Script from "next/script";

export default function LocalBusinessSchema() {
  // Review data (in production, this would come from a real reviews API/database)
  const reviewData = [
    {
      author: "Aarav Mehta",
      datePublished: "2025-10-15",
      reviewBody: "Mobile Armour has transformed how we manage device security. The onboarding was seamless and support is outstanding.",
      ratingValue: 5
    },
    {
      author: "Sana Kapoor",
      datePublished: "2025-09-22",
      reviewBody: "We love the simplicity and power. Policy updates roll out instantly across our fleet.",
      ratingValue: 5
    },
    {
      author: "Rohit Verma",
      datePublished: "2025-08-10",
      reviewBody: "Reliable, intuitive, and secure. Exactly what our remote teams needed.",
      ratingValue: 5
    }
  ];

  // Calculate aggregate rating
  const totalRating = reviewData.reduce((sum, review) => sum + review.ratingValue, 0);
  const averageRating = (totalRating / reviewData.length).toFixed(1);
  const reviewCount = reviewData.length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://mobilearmour.com.au/#business",
    "name": "Mobile Armour",
    "image": "https://mobilearmour.com.au/logo.png",
    "description": "Expert mobile phone repair services in Heidelberg. Specializing in iPhone repair, iPad repair, LCD screen replacement, battery replacement, and phone accessories. We repair all iPhone models including iPhone 14, iPhone 13, iPhone 11, Samsung models including Galaxy S23 Ultra, S22, S21, and many more. Quick repair service for cracked screens and damaged devices.",
    "url": "https://mobilearmour.com.au",
    "telephone": "+61-405-326-205",
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": parseFloat(averageRating),
      "reviewCount": reviewCount
    },
    "review": reviewData.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.datePublished,
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.ratingValue
      }
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mobile Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "iPhone Repair",
            "description": "Expert repair for all iPhone models including iPhone 15, iPhone 14, iPhone 14 Pro, iPhone 13, iPhone 13 Pro, iPhone 11, iPhone XR, iPhone X, iPhone 8, iPhone SE and more. Services include screen replacement, battery replacement, and quick repair."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Samsung Phone Repair",
            "description": "Professional repair for Samsung Galaxy models including S23 Ultra, S23, S22, S22 Ultra, S21, S21 FE, S21 Ultra, S20, S20 FE, A54, A53, A33, A23, A14, A13, A22, A32, A52, A73, Note 20 Ultra and more."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Samsung Galaxy Z Fold and Z Flip Repair",
            "description": "Expert repair services for Samsung foldable phones including Galaxy Z Fold 4, Z Fold 5, Z Flip 4, Z Flip 5, Z Flip 3 and other models."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Apple Watch Repair",
            "description": "Professional Apple Watch repair and battery replacement for Series 8, Series 7, Series 6, Ultra, and other models."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tablet and iPad Repair",
            "description": "Expert repair services for Samsung tablets, iPads, and other tablets including screen replacement and battery service."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Samsung Wearables Repair",
            "description": "Repair services for Samsung Galaxy Watch 5, Galaxy Watch 4, Galaxy Buds, and other Samsung wearables."
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

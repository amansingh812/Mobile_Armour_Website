"use client";

import Script from "next/script";

export default function LocalBusinessSchema() {
  // Review data from actual Google Reviews
  const reviewData = [
    {
      author: "Anthony Mchugh",
      datePublished: "2024-12-15",
      reviewBody: "Really good and helpful assistance. The phone is fixed well and operating good. They helped me with my phone. I recommend them.",
      ratingValue: 5
    },
    {
      author: "Oli",
      datePublished: "2024-12-10",
      reviewBody: "Awesome worker, great customer service, and really friendly. They were able to help fix my phone and the store is not bad. Great service, definitely would recommend to others.",
      ratingValue: 5
    },
    {
      author: "Sam Elsmere",
      datePublished: "2024-12-05",
      reviewBody: "Super quick & easy. I smash my phone a lot and they can have it fixed quickly at a great rate.",
      ratingValue: 5
    },
    {
      author: "Con Sakkas",
      datePublished: "2024-11-28",
      reviewBody: "Great service. Came to my home and replaced my iPad glass screen that was smashed, quick service, and reasonable price. Highly recommend.",
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
    "@id": "https://www.mobilearmour.com.au/#business",
    "name": "Mobile Armour",
    "image": "https://www.mobilearmour.com.au/img/og-image.jpg",
    "description": "Apple Authorised Repair Provider in Heidelberg, Melbourne. Using genuine Apple parts and IRP certified technicians for iPhone, iPad, and Apple Watch repairs. Also servicing Samsung, Google Pixel, and all major brands. Expert mobile phone repair including screen replacement, battery replacement, and phone accessories. We repair all iPhone models including iPhone 17, 16, 15, 14, 13, Samsung Galaxy S25, S24, S23 and more. Quick same-day service for cracked screens and damaged devices.",
    "url": "https://www.mobilearmour.com.au",
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
    "areaServed": [
      { "@type": "City", "name": "Heidelberg, VIC 3084" },
      { "@type": "City", "name": "Ivanhoe, VIC 3079" },
      { "@type": "City", "name": "Rosanna, VIC 3084" },
      { "@type": "City", "name": "Bulleen, VIC 3105" },
      { "@type": "City", "name": "Templestowe, VIC 3106" },
      { "@type": "City", "name": "Greensborough, VIC 3088" },
      { "@type": "City", "name": "Preston, VIC 3072" },
      { "@type": "City", "name": "Doncaster, VIC 3108" },
      { "@type": "City", "name": "Eltham, VIC 3095" },
      { "@type": "City", "name": "Epping, VIC 3076" },
      { "@type": "City", "name": "Bundoora, VIC 3083" },
      { "@type": "City", "name": "Reservoir, VIC 3073" },
      { "@type": "City", "name": "Northcote, VIC 3070" },
      { "@type": "City", "name": "Coburg, VIC 3058" },
      { "@type": "City", "name": "South Morang, VIC 3752" },
      { "@type": "City", "name": "Thomastown, VIC 3074" }
    ],
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
            "name": "Apple Authorised iPhone Repair",
            "description": "Apple Authorised iPhone repair using genuine Apple parts. IRP certified technicians servicing all iPhone models including iPhone 17, 16, 15, 14, 13, 12, 11, SE and more. Services include screen replacement, battery replacement, and same-day repair."
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
            "name": "Apple Authorised Watch Screen Repair",
            "description": "Apple Authorised Apple Watch screen replacement in Heidelberg using genuine Apple parts. All Apple Watch models — Ultra, Series 10, 9, 8, 7, 6, SE. Same-day service with IRP certified technicians and 6-month warranty."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Apple Authorised Watch Battery Replacement",
            "description": "Apple Authorised Apple Watch battery replacement in Heidelberg Melbourne using genuine Apple batteries. Restore all-day battery life with IRP certified service for Apple Watch Ultra, Series 10, 9, 8, 7, 6, SE at Warringal Shopping Centre."
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

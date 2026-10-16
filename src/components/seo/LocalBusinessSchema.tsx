// Server-rendered so the JSON-LD is in the initial HTML Google crawls.
// Review stars are intentionally NOT included: Google ignores self-served
// LocalBusiness reviews, and hand-typed numbers drift from the real
// Google Business Profile rating.
import { BUSINESS, openingHoursSpecification } from "@/data/business";

export default function LocalBusinessSchema() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS.url}/#website`,
    "name": BUSINESS.name,
    "url": BUSINESS.url,
    "inLanguage": "en-AU",
    "publisher": { "@id": `${BUSINESS.url}/#business` },
  };
  const schema = {
    "@context": "https://schema.org",
    // MobilePhoneStore is a LocalBusiness subtype: covers both the repair
    // desk and the accessories shop.
    "@type": "MobilePhoneStore",
    "@id": `${BUSINESS.url}/#business`,
    "name": BUSINESS.name,
    "image": BUSINESS.image,
    "logo": BUSINESS.logo,
    "description": "Expert mobile phone repair services in Heidelberg. Specializing in iPhone repair, iPad repair, Apple Watch screen replacement, Apple Watch battery replacement, LCD screen replacement, battery replacement, and phone accessories. We repair all iPhone models including iPhone 14, iPhone 13, iPhone 11, Samsung models including Galaxy S23 Ultra, S22, S21, Apple Watch Series Ultra, 9, 8, 7, 6, SE and many more. Quick repair service for cracked screens and damaged devices.",
    "url": BUSINESS.url,
    "telephone": BUSINESS.phoneIntl,
    "email": BUSINESS.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${BUSINESS.address.unit}, ${BUSINESS.address.centre}, ${BUSINESS.address.street}`,
      "addressLocality": BUSINESS.address.suburb,
      "addressRegion": BUSINESS.address.state,
      "postalCode": BUSINESS.address.postcode,
      "addressCountry": BUSINESS.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BUSINESS.geo.lat,
      "longitude": BUSINESS.geo.lng
    },
    "hasMap": BUSINESS.mapsUrl,
    "openingHoursSpecification": openingHoursSpecification(),
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
            "name": "Apple Watch Screen Repair",
            "description": "Professional Apple Watch screen replacement in Heidelberg for all Apple Watch Series — Ultra, Series 9, 8, 7, 6, SE and older models. Same-day service with quality parts and warranty."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Apple Watch Battery Replacement",
            "description": "Apple Watch battery replacement in Heidelberg Melbourne. Restore all-day battery life with a fast, reliable battery swap for Apple Watch Series Ultra, 9, 8, 7, 6, SE and older models at Warringal Shopping Centre."
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
    "sameAs": [...BUSINESS.sameAs]
  };

  return (
    <>
      <script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

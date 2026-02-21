import React from 'react';
import { Metadata } from 'next';
import ProductsLayoutClient from './ProductsLayoutClient';

export const metadata: Metadata = {
  title: "Phone Cases & Accessories Heidelberg | Mobile Armour Shop",
  description:
    "Shop premium phone cases, screen protectors, chargers & mobile accessories in Heidelberg Melbourne. iPhone & Samsung brands available. Visit Mobile Armour at Warringal Shopping Centre or browse online. Quality products, great prices.",
  keywords: [
    "phone cases heidelberg",
    "mobile accessories melbourne",
    "iphone case warringal shopping centre",
    "samsung accessories heidelberg",
    "screen protector heidelberg",
    "phone charger heidelberg",
    "mobile armour shop",
    "phone accessories near me",
  ],
  openGraph: {
    title: "Phone Cases & Accessories - Mobile Armour Heidelberg",
    description:
      "Premium mobile phone accessories at Warringal Shopping Centre, Heidelberg. iPhone & Samsung cases, screen protectors, chargers & more.",
    url: "https://www.mobilearmour.com.au/products",
    siteName: "Mobile Armour",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phone Cases & Accessories - Mobile Armour Heidelberg",
    description:
      "Shop premium mobile accessories at Warringal Shopping Centre. iPhone & Samsung cases, chargers & more.",
  },
  alternates: {
    canonical: "https://www.mobilearmour.com.au/products",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProductsLayoutClient>{children}</ProductsLayoutClient>;
}

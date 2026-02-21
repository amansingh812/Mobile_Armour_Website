import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import Pricing2 from "@/components/sections/pricing/pricing2";
import React from "react";
import { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Phone Repair Prices Heidelberg | Mobile Armour Cost Guide",
  description:
    "Transparent phone repair pricing at Mobile Armour Heidelberg. iPhone screen repair from $79, Samsung screen repair from $89, battery replacement from $59. No hidden fees. Free diagnosis. Located at Warringal Shopping Centre, VIC 3084.",
  keywords: [
    "phone repair cost heidelberg",
    "iphone screen repair price melbourne",
    "samsung repair cost heidelberg",
    "mobile repair pricing warringal",
    "battery replacement cost heidelberg",
    "screen repair price near me",
    "cheap phone repair melbourne north",
    "mobile armour prices",
  ],
  openGraph: {
    title: "Phone Repair Prices - Mobile Armour Heidelberg",
    description:
      "Transparent repair pricing. iPhone screen from $79, Samsung from $89. Free diagnosis at Warringal Shopping Centre.",
    url: "https://www.mobilearmour.com.au/price",
    siteName: "Mobile Armour",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phone Repair Prices - Mobile Armour Heidelberg",
    description:
      "Affordable phone repair in Heidelberg. iPhone & Samsung repairs with no hidden fees.",
  },
  alternates: {
    canonical: "https://www.mobilearmour.com.au/price",
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

function PricePage({}) {
  return (
    <div>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Pricing' },
      ]} />
      <Breadcrumb title="Pricing Plan" />
      <Pricing2 />
    </div>
  );
}

export default PricePage;

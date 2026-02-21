// import Blog1 from "@/components/sections/blog/blog1";
import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import FaqItems from "@/components/sections/faq/faq-items";
import Mission from "@/components/sections/mission/mission";
import React from "react";
import { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQPageSchema from "@/components/seo/FAQPageSchema";

export const metadata: Metadata = {
  title: "FAQ - Phone Repair Questions | Mobile Armour Heidelberg",
  description:
    "Got questions about mobile phone repair in Heidelberg? Find answers about repair times, warranty, pricing, water damage repair, data safety & more. Mobile Armour at Warringal Shopping Centre answers your top questions.",
  keywords: [
    "phone repair FAQ heidelberg",
    "mobile repair questions melbourne",
    "how long does phone repair take",
    "phone repair warranty heidelberg",
    "water damage repair FAQ",
    "mobile armour FAQ",
    "screen repair questions",
    "phone repair cost questions heidelberg",
  ],
  openGraph: {
    title: "Frequently Asked Questions - Mobile Armour Heidelberg",
    description:
      "Answers to common phone repair questions. Repair times, warranty, pricing & more at Warringal Shopping Centre.",
    url: "https://www.mobilearmour.com.au/faq",
    siteName: "Mobile Armour",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phone Repair FAQ - Mobile Armour Heidelberg",
    description:
      "Common questions about mobile repair. Times, warranty, pricing & more.",
  },
  alternates: {
    canonical: "https://www.mobilearmour.com.au/faq",
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

function FaqPage({ }) {
  return (
    <div>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'FAQ' },
      ]} />
      <FAQPageSchema />
      <Breadcrumb title="FAQ's" />
      <FaqItems />
      <Mission />
      {/* <Blog1 /> */}
    </div>
  );
}

export default FaqPage;

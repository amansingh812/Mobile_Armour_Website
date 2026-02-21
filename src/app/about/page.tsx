import About1 from "@/components/sections/about/about1";
import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import Client from "@/components/sections/client/client";
import Cta from "@/components/sections/cta/cta";
import Promo1 from "@/components/sections/promo/promo1";
import Service3 from "@/components/sections/service/service3";
import Team1 from "@/components/sections/team/team1";
import Video2 from "@/components/sections/video/video2";
import React from "react";
import { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "About Mobile Armour | Trusted Phone Repair Experts in Heidelberg",
  description:
    "Mobile Armour is Heidelberg's trusted mobile phone repair shop located at Warringal Shopping Centre, VIC 3084. Certified technicians, 6-month warranty on all repairs, same-day service for iPhone, Samsung & all major brands. Serving Melbourne's northern suburbs.",
  keywords: [
    "about mobile armour",
    "phone repair experts heidelberg",
    "mobile repair shop warringal",
    "certified phone technicians melbourne",
    "trusted phone repair heidelberg",
    "mobile armour heidelberg about",
  ],
  openGraph: {
    title: "About Mobile Armour - Heidelberg's Trusted Phone Repair Experts",
    description:
      "Certified mobile repair technicians at Warringal Shopping Centre, Heidelberg VIC 3084. 6-month warranty, same-day service.",
    url: "https://www.mobilearmour.com.au/about",
    siteName: "Mobile Armour",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Mobile Armour - Phone Repair Heidelberg",
    description:
      "Trusted mobile repair at Warringal Shopping Centre. Certified technicians, 6-month warranty.",
  },
  alternates: {
    canonical: "https://www.mobilearmour.com.au/about",
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

function AboutPage({ }) {
  return (
    <div>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'About Us' },
      ]} />
      <Breadcrumb title="About Us" />
      <About1 />
      <Service3 />
      <Promo1
        subTitle="Quality Work"
        title="We Are Committed to Best Service"
        sectionClass="section-padding"
      />
      <Cta title="Got a Device that Needs Fixing?" />
    </div>
  );
}

export default AboutPage;

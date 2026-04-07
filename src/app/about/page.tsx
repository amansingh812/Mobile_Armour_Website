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
  title: "About Mobile Armour | Apple Authorised Repair Provider Heidelberg",
  description:
    "Mobile Armour is an Apple Authorised Repair Provider in Heidelberg, located at Warringal Shopping Centre, VIC 3084. IRP certified technicians, genuine Apple parts, 6-month warranty on all repairs, same-day service for iPhone, iPad, Apple Watch, Samsung & all major brands.",
  keywords: [
    "about mobile armour",
    "apple authorised repair provider heidelberg",
    "phone repair experts heidelberg",
    "mobile repair shop warringal",
    "IRP certified technicians melbourne",
    "trusted phone repair heidelberg",
    "genuine apple parts repair",
    "mobile armour heidelberg about",
  ],
  openGraph: {
    title: "About Mobile Armour — Apple Authorised Repair Provider in Heidelberg",
    description:
      "Apple Authorised Repair Provider with IRP certified technicians at Warringal Shopping Centre, Heidelberg VIC 3084. Genuine Apple parts, 6-month warranty, same-day service.",
    url: "https://www.mobilearmour.com.au/about",
    siteName: "Mobile Armour",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Mobile Armour — Apple Authorised Repair | Heidelberg",
    description:
      "Apple Authorised Repair Provider at Warringal Shopping Centre. IRP certified technicians, genuine Apple parts, 6-month warranty.",
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

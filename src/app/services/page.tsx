import About3 from "@/components/sections/about/about3";
import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import Cta from "@/components/sections/cta/cta";
import Service3 from "@/components/sections/service/service3";
import React from "react";
import { Metadata } from "next";
import Funfact from "@/components/sections/funfact/funfact";
import Service1 from "@/components/sections/service/service1";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";

export const metadata: Metadata = {
  title: "Mobile Repair Services Heidelberg | iPhone, iPad, Apple Watch Screen & Battery",
  description: "Professional mobile repair services in Heidelberg, serving Ivanhoe, Rosanna, Bulleen & Melbourne northern suburbs. Expert iPhone repair, iPad repair, Apple Watch screen & battery replacement, LCD repair at Warringal Shopping Centre. Fast same-day service.",
  keywords: [
    "mobile repair heidelberg",
    "ipad repair heidelberg",
    "lcd repair heidelberg",
    "battery replacement heidelberg",
    "iphone repair heidelberg",
    "screen replacement heidelberg",
    "phone repair services heidelberg",
    "apple watch screen repair heidelberg",
    "apple watch battery replacement heidelberg",
    "apple watch repair heidelberg",
    "apple watch screen replacement melbourne",
    "apple watch battery replacement melbourne",
    "phone repair ivanhoe",
    "phone repair rosanna bulleen",
    "mobile repair melbourne northern suburbs",
    "samsung screen repair heidelberg",
  ],
  openGraph: {
    title: "Mobile Repair Services Heidelberg - Mobile Armour",
    description: "Expert mobile repair services in Heidelberg. iPhone, iPad, Apple Watch screen & battery replacement at Warringal Shopping Centre.",
    url: "https://www.mobilearmour.com.au/services",
    siteName: "Mobile Armour",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Repair Services - Mobile Armour Heidelberg",
    description: "iPhone, iPad, Apple Watch screen & battery replacement at Warringal Shopping Centre, Heidelberg.",
  },
  alternates: {
    canonical: "https://www.mobilearmour.com.au/services",
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

function ServicesPage({ }) {
  return (
    <div>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services' },
      ]} />
      <ServiceSchema />
      <Breadcrumb title="Services" />
      <About3
        title="Expert Mobile Repair Solution"
        subTitle="Our Services"
        sectionClass="section-padding"
      />
      <Service1 />
      <Service3 />
      <Funfact />
      {/* <Service2Slider /> */}
      <Cta />



      {/* <Testimonial1 /> */}
    </div>
  );
}

export default ServicesPage;

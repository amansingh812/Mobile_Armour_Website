import About3 from "@/components/sections/about/about3";
import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import Cta from "@/components/sections/cta/cta";
import Service3 from "@/components/sections/service/service3";
import React from "react";
import { Metadata } from "next";
import Funfact from "@/components/sections/funfact/funfact";
import Service1 from "@/components/sections/service/service1";

export const metadata: Metadata = {
  title: "Mobile Repair Services Heidelberg | iPad, LCD & Battery Replacement",
  description: "Professional mobile repair services in Heidelberg. Expert iPhone repair, iPad repair, LCD screen replacement, battery replacement at Warringal Shopping Centre. Fast & reliable service.",
  keywords: [
    "mobile repair heidelberg",
    "ipad repair heidelberg",
    "lcd repair heidelberg",
    "battery replacement heidelberg",
    "iphone repair heidelberg",
    "screen replacement heidelberg",
    "phone repair services heidelberg",
  ],
  openGraph: {
    title: "Mobile Repair Services Heidelberg - Mobile Armour",
    description: "Expert mobile repair services in Heidelberg. iPhone, iPad, LCD & battery replacement at Warringal Shopping Centre.",
  },
};

function ServicesPage({ }) {
  return (
    <div>
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

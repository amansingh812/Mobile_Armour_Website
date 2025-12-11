import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import ContactInfo from "@/components/sections/contact/contact-info";
import ContactSection from "@/components/sections/contact/contact-section";
import Map from "@/components/shared/map/map";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Mobile Armour Heidelberg | Phone Repair Shop Location & Hours",
  description: "Visit Mobile Armour at Warringal Shopping Centre, Heidelberg VIC 3084. Expert mobile repair services. Call 0405-326-205 or email repair@mobilearmour.com.au. Open 7 days a week 9:30am-5:30pm.",
  keywords: [
    "mobile armour heidelberg",
    "phone repair heidelberg location",
    "mobile repair warringal shopping centre",
    "heidelberg phone repair contact",
    "phone repair near me heidelberg",
    "mobile repair shop heidelberg",
    "iphone repair heidelberg contact",
    "screen repair heidelberg location",
    "battery replacement heidelberg",
    "phone repair shop near warringal",
    "heidelberg vic 3084 phone repair",
    "mobile phone repair heidelberg hours",
  ],
  openGraph: {
    title: "Contact Mobile Armour - Phone Repair Heidelberg",
    description: "Visit us at Warringal Shopping Centre, Heidelberg. Expert iPhone & Samsung repair. Call 0405-326-205. Open 7 days.",
    url: "https://mobilearmour.com.au/contact",
    siteName: "Mobile Armour",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Mobile Armour Heidelberg",
    description: "Visit us at Warringal Shopping Centre, Heidelberg VIC 3084. Expert mobile repair services.",
  },
  alternates: {
    canonical: "https://mobilearmour.com.au/contact",
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

function ContactPage({ }) {
  return (
    <div>
      <Breadcrumb title="Contact" />
      <Map />
      <ContactInfo />
      <ContactSection />
    </div>
  );
}

export default ContactPage;

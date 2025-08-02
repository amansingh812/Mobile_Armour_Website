import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import ContactInfo from "@/components/sections/contact/contact-info";
import ContactSection from "@/components/sections/contact/contact-section";
// import Map from "@/components/shared/map/map";
import React from "react";

function ContactPage({ }) {
  return (
    <div>
      <Breadcrumb title="Contact" />
      {/* <Map /> */}
      <ContactInfo />
      <ContactSection />
    </div>
  );
}

export default ContactPage;

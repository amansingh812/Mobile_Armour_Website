import ContactInfoCard from "@/components/shared/card/contact-info-card";
import { ContactInfoCardData } from "@/data/contact-info-card-seeds";
import React from "react";

function ContactInfo({}) {
  return (
    <div className="contact-info-wrapper section-padding pb-90">
      <div className="container">
        <div className="row">
          {ContactInfoCardData &&
            ContactInfoCardData.map((item, i) => (
              <div className="col-xl-4 col-lg-4 col-md-6 col-12" key={i}>
                <ContactInfoCard contactInfoCardData={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;

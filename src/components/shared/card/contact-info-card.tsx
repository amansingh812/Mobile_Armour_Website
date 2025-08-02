import { IContactInfoCardData } from "@/data/contact-info-card-seeds";
import Image from "next/image";
import React from "react";
interface ContactInfoCardProps {
  contactInfoCardData: IContactInfoCardData;
}
function ContactInfoCard({ contactInfoCardData }: ContactInfoCardProps) {
  return (
    <div className="single-contact-info">
      <div className="contact-icon">
        <Image
          src={contactInfoCardData.src}
          alt={contactInfoCardData.alt}
          width={32}
          height={32}
        />
      </div>
      <p>{contactInfoCardData.text}</p>
    </div>
  );
}

export default ContactInfoCard;

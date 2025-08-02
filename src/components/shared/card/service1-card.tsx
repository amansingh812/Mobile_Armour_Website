import { IService1CardData } from "@/data/service1-card-seeds";
import Image from "next/image";
import React from "react";
interface Service1CardProps {
  service1CardData: IService1CardData;
}
function Service1Card({ service1CardData }: Service1CardProps) {
  return (
    <div className="single-service-wrap">
      <div className="service-icon">
        <Image
          src={service1CardData.src}
          width={50}
          height={50}
          alt={service1CardData.alt}
        />
      </div>
      <h4>{service1CardData.title}</h4>
      <p>{service1CardData.desc}</p>
      {/* <a href={service1CardData.href} className="read_more_link">
        <span className="link_text">{service1CardData.linkText}</span>
        <span className="link_icon">{service1CardData.linkIcon}</span>
      </a> */}
    </div>
  );
}

export default Service1Card;

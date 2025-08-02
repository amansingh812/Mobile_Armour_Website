import { IService3CardData } from "@/data/service3-card-seeds";
import Image from "next/image";
import React from "react";
interface Service3CardProps {
  service3CardData: IService3CardData;
}
function Service3Card({ service3CardData }: Service3CardProps) {
  return (
    <div className={`single-service-item ${service3CardData.className}`}>
      <div className="service-icon">
        <Image
          src={service3CardData.src} alt={service3CardData.alt}
          width={64}
          height={64}

        />
      </div>
      <div className="service-title">
        <h4>{service3CardData.title}</h4>
      </div>
      {/* <a href={service3CardData.href} className="read_more_link">
        <span className="link_text">{service3CardData.linkText}</span>
        <span className="link_icon">{service3CardData.linkIcon}</span>
      </a> */}
    </div>
  );
}

export default Service3Card;

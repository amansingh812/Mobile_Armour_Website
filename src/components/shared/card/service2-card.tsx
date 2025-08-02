import { IService2CardData } from "@/data/service2-card-seeds";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Service2CardProps {
  service2CardData: IService2CardData;
}
function Service2Card({ service2CardData }: Service2CardProps) {
  return (
    <div className="single-service-wrap">
      <div className="service-img">
        <Image
          src={service2CardData.src}
          width={376}
          height={250}
          alt={service2CardData.alt}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        <div className="service-icon">
          <Image
            src={service2CardData.iconSrc}
            width={50}
            height={50}
            alt={service2CardData.alt}
          />
        </div>
      </div>
      <div className="service-content">
        <h4>{service2CardData.title}</h4>
        <p>{service2CardData.desc}</p>
        <Link href={service2CardData.href} className="read_more_link">
          <span className="link_text">{service2CardData.linkText}</span>
          <span className="link_icon">
            <i className="las la-arrow-right"></i>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Service2Card;

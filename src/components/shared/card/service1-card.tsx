import { IService1CardData } from "@/data/service1-card-seeds";
import Image from "next/image";
import React from "react";
interface Service1CardProps {
  service1CardData: IService1CardData;
}
function Service1Card({ service1CardData }: Service1CardProps) {
  return (
    <div className="single-service-wrap min-h-[300px] flex flex-col">
      <div className="service-icon mb-4">
        <Image
          src={service1CardData.src}
          width={50}
          height={50}
          alt={service1CardData.alt}
          className="w-12 h-12 object-contain"
        />
      </div>
      <h4 className="text-lg font-semibold mb-2 line-clamp-2">{service1CardData.title}</h4>
      <p className="text-gray-600 flex-grow line-clamp-3">{service1CardData.desc}</p>
      {/* <a href={service1CardData.href} className="read_more_link mt-4 inline-block">
        <span className="link_text">{service1CardData.linkText}</span>
        <span className="link_icon">{service1CardData.linkIcon}</span>
      </a> */}
    </div>
  );
}

export default Service1Card;

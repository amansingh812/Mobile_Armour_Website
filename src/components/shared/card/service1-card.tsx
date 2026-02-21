import { IService1CardData } from "@/data/service1-card-seeds";
import Image from "next/image";
import React from "react";

interface Service1CardProps {
  service1CardData: IService1CardData;
}

function Service1Card({ service1CardData }: Service1CardProps) {
  return (
    <div className="single-service-wrap flex flex-col group cursor-pointer">
      <div className="service-icon mb-3 md:mb-4 transition-transform duration-300 ease-out group-hover:scale-110">
        <Image
          src={service1CardData.src}
          width={50}
          height={50}
          alt={service1CardData.alt}
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
        />
      </div>
      <h4 className="text-base md:text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-[#FF5600]">
        {service1CardData.title}
      </h4>
      <p className="text-gray-600 flex-grow text-sm md:text-base">
        {service1CardData.desc}
      </p>
      <a
        href={service1CardData.href}
        className="read_more_link mt-4 inline-block hidden md:inline-block transition-all duration-300 group-hover:translate-x-1"
      >
        <span className="link_text">{service1CardData.linkText}</span>
        <span className="link_icon">{service1CardData.linkIcon}</span>
      </a>
    </div>
  );
}

export default Service1Card;

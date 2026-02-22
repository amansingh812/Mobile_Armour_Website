"use client";

import PrimaryBtn from "@/components/shared/button/primary-btn";

import Image from "next/image";

interface props {
  subtitle: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
  src: string;
  isFirst?: boolean;
}
export default function Hero1Slide({
  subtitle,
  title,
  description,
  link,
  buttonText,
  src,
  isFirst = false,
}: props) {
  return (
    <div className="single-slide-item d-flex align-items-center position-relative">
      <Image
        src={src}
        alt={`${title} - Mobile Armour phone repair Heidelberg`}
        fill
        style={{ objectFit: "cover" }}
        priority={isFirst}
        sizes="100vw"
        quality={isFirst ? 85 : 75}
      />
      <div className="overlay-2"></div>
      <div className="hero-area-content">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-6 ">
              <div className="section-title">
                <h6 className="text-white">{subtitle}</h6>
                <h1 className="text-white">{title}</h1>
              </div>
              <p className="text-white">{description}</p>
             
              <PrimaryBtn
                href={link}
                text={buttonText}
                className="mt-40 position-relative z-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

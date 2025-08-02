import { IPlCardData } from "@/data/pl-card-seeds";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface PlCardProps {
  plCardData: IPlCardData;
}
function PlCard({ plCardData }: PlCardProps) {
  return (
    <div className="row align-items-center mt-60">
      <div className="col-xl-6 col-lg-6">
        <div className="project-list-img">
          <Image
            src={plCardData.src}
            alt={plCardData.alt}
            width={576}
            height={507}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div className="col-xl-6 col-lg-6">
        <div className="project-list-content">
          <div className="section-title">
            <h6>{plCardData.subTitle}</h6>
            <h2>{plCardData.title}</h2>
          </div>
          <p>{plCardData.desc}</p>
          <Link href={plCardData.href} className="read_more_link">
            <span className="link_text">{plCardData.text}</span>
            <span className="link_icon">{plCardData.icon}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlCard;

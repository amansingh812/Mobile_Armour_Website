import { IPsCardData } from "@/data/ps-card-seeds";
import Image from "next/image";
import React from "react";
interface PsCardProps {
  psCardData: IPsCardData;
}
function PsCard({ psCardData }: PsCardProps) {
  return (
    <div>
      <a href={psCardData.href} className="single-project-wrapper">
        <div className="project-img">
          <Image
            src={psCardData.url}
            alt={psCardData.alt}
            width={250}
            height={250}
            style={{
              width: "250px",
              height: "250px",
            }}
          />
        </div>
        <div className="project-title">
          <h3>{psCardData.title}</h3>
          <h6>{psCardData.subTitle}</h6>
        </div>
      </a>
    </div>
  );
}

export default PsCard;

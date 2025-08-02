import { IFeature3CardData } from "@/data/feature3-card-seeds";
import Image from "next/image";
import React from "react";
interface Feature3CardProps {
  feature3CardData: IFeature3CardData;
}
function Feature3Card({ feature3CardData }: Feature3CardProps) {
  return (
    <div className="single-feature-wrap">
      <div className="feature-icon">
        <Image
          src={feature3CardData.src}
          alt={feature3CardData.alt}
          width={64}
          height={64}
        />
      </div>
      <h5>{feature3CardData.title}</h5>
      <p>{feature3CardData.desc}</p>
    </div>
  );
}

export default Feature3Card;

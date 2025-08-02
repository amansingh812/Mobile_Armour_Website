import { IPMasonryCardData } from "@/data/p-masonry-card-seeds";
import Image from "next/image";
import React from "react";
interface PMasonryCardProps {
  pMasonryCardData: IPMasonryCardData;
}
function PMasonryCard({ pMasonryCardData }: PMasonryCardProps) {
  return (
    <div>
      <a href={pMasonryCardData.href}>
        <div className="project-box">
          <div className="project-img">
            <Image
              src={pMasonryCardData.src}
              className="img-fluid mx-auto d-block"
              alt={pMasonryCardData.alt}
              width={370}
              height={370}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div className="project-detail">
            <h4 className="mb-0">{pMasonryCardData.title}</h4>
            <p className="mb-3">{pMasonryCardData.subTitle}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default PMasonryCard;

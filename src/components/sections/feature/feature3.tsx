import Feature3Card from "@/components/shared/card/feature3-card";
import { Feature3CardData } from "@/data/feature3-card-seeds";
import React from "react";

function Feature3({}) {
  return (
    <div className="feature-section section-padding pt-0">
      <div className="container">
        <div className="row">
          {Feature3CardData &&
            Feature3CardData.map((item, i) => (
              <div className="col-xl-4 col-lg-4 col-md-4" key={i}>
                <Feature3Card feature3CardData={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Feature3;

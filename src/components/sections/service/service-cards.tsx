import Service1Card from "@/components/shared/card/service1-card";
import { Service1CardData } from "@/data/service1-card-seeds";
import React from "react";

function ServiceCards({}) {
  return (
    <div className="service-section gray-bg section-padding pb-20">
      <div className="container">
        <div className="row mt-100">
          {Service1CardData &&
            Service1CardData.map((item, i) => (
              <div className="col-xl-4 col-lg-4 col-md-6 " key={i}>
                <Service1Card service1CardData={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceCards;

import BorderedBtn from "@/components/shared/button/bordered-btn";
import Service2Card from "@/components/shared/card/service2-card";
import SectionTitle from "@/components/shared/section/section-title";
import { Service2CardData } from "@/data/service2-card-seeds";
import React from "react";

function Service2({}) {
  return (
    <div className="service-section gray-bg service-two section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 ">
            <SectionTitle
              title="Outstanding Service Makes the Difference"
              subTitle="Our Services"
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-4 text-lg-end d-none d-lg-inline-block">
            <BorderedBtn href="/services" text="More Services" />
          </div>
        </div>
        <div className="row mt-40">
          {Service2CardData &&
            Service2CardData.map((item, i) => (
              <div className="col-xl-4 col-lg-4 col-md-6 " key={i}>
                <Service2Card service2CardData={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Service2;

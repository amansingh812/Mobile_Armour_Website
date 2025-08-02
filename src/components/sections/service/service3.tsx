import Service3Card from "@/components/shared/card/service3-card";
import SectionTitle from "@/components/shared/section/section-title";
import { Service3CardData } from "@/data/service3-card-seeds";
import React from "react";

function Service3({ }) {
  return (
    <div id="service-3" className="service-section dark-bg section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <SectionTitle
              title="High Quality Repair Services"
              subTitle="What We Offer" 
              textColor="text-white"
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <p className="text-white">
              At Mobile Armour, we understand how important your mobile device is in your daily life, which is why we offer fast, reliable, and affordable phone repairs.
            </p>
            <p className="text-white">
              From cracked screens and battery replacements to water damage and software troubleshooting, our experienced technicians ensure your phone is back in action in no time.
            </p>
          </div>
        </div>
        <div className="row gy-4 mt-60">
          {Service3CardData &&
            Service3CardData.map((item, i) => (
              <div className="col-xl-3 col-lg-3 col-md-6 " key={i}>
                <Service3Card service3CardData={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Service3;

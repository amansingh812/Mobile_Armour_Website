import Service1Card from "@/components/shared/card/service1-card";
import SectionTitle from "@/components/shared/section/section-title";
import { Service1CardData } from "@/data/service1-card-seeds";
import React from "react";

function Service1({ }) {
  return ( 
    <>
      <style>{`
        .service-section {
          display: none;
        }

        @media (min-width: 768px) {
          .service-section {
            display: block !important;
          }
        }
      `}</style>

      <div className="service-section py-12 md:py-20" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        <div className="row align-items-center service-title">
          <div className="col-xl-8 col-lg-8 ">
            < SectionTitle
              title="We are doing all types of Mobile services"
              subTitle="Services"
            />
          </div>
        </div>
        <div className="row mt-8 md:mt-100 g-3 md:g-4">
          {Service1CardData &&
            Service1CardData.map((item, i) => (
              <div className="col-6 col-md-6 col-lg-4 col-xl-4" key={i}>
                <Service1Card service1CardData={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Service1;

import React from "react";
import SdLeft from "./sd-left";
import SdRight from "./sd-right";

function SdSections({}) {
  return (
    <div className="service-details-area section-padding">
      <div className="container">
        <div className="row gx-5">
          <div className="col-xl-8 col-lg-8">
            <SdLeft />
          </div>
          <div className="col-xl-4 col-lg-4">
            <SdRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SdSections;

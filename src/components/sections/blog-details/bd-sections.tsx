import React from "react";
import BdLeft from "./bd-left";
import BdRight from "./bd-right";

function BdSections({}) {
  return (
    <div className="blog-details-page section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-12">
            <BdLeft />
          </div>
          <div className="col-xl-4 col-lg-4 col-12">
            <BdRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BdSections;

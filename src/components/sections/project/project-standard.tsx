import PsCard from "@/components/shared/card/ps-card";
import { PsCardData } from "@/data/ps-card-seeds";
import React from "react";

function ProjectStandard({}) {
  return (
    <div id="project-standard" className="project-section section-padding">
      <div className="container">
        <div className="row">
          {PsCardData &&
            PsCardData.map((item, i) => (
              <div className="col-xl-4 col-lg-4 col-md-6" key={i}>
                <PsCard psCardData={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectStandard;

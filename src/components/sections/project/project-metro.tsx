import PmCard from "@/components/shared/card/pm-card";
import { PmCardData } from "@/data/pm-card-seeds";
import React from "react";

function ProjectMetro({}) {
  return (
    <div id="project-3" className="project-section section-padding">
      <div className="row gx-0">
        <div className="col-xl-6 col-lg-6 col-md-6">
          <PmCard {...PmCardData[0]} />
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6">
          <div className="row gx-0">
            {PmCardData.slice(1, 3).map((item, i) => (
              <div key={i} className="col-lg-6">
                <PmCard {...item} />
              </div>
            ))}
            <div className="col-lg-12 d-none d-lg-block">
              <PmCard {...PmCardData[3]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectMetro;

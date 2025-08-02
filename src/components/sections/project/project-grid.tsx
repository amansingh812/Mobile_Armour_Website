import Project1Card from "@/components/shared/card/project1-card";
import { PgCardData } from "@/data/pg-card-seeds";
import React from "react";

function ProjectGrid({ }) {
  return (
    <div
      id="project-2"
      className="project-grid project-section section-padding"
    >
      <div className="container-fluid">
        <div className="row">
          {PgCardData &&
            PgCardData.map((item, i) => (
              <div className="col-xl-3 col-lg-3 col-md-6" key={i}>
                <Project1Card project1CardData={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectGrid;



import PlCard from "@/components/shared/card/pl-card";
import { PlCardData } from "@/data/pl-card-seeds";
import React from "react";

function ProjectList({}) {
  return (
    <div className="project-list-wrap section-padding">
      <div className="container">
        {PlCardData &&
          PlCardData.map((item, i) => <PlCard key={i} plCardData={item} />)}
      </div>
    </div>
  );
}

export default ProjectList;

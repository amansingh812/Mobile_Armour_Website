"use client";
import React, { useState, useEffect } from "react";
import PMasonryCard from "@/components/shared/card/p-masonry-card";
import { PMasonryCardData } from "@/data/p-masonry-card-seeds";

function ProjectMasonry() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filteredData, setFilteredData] = useState(PMasonryCardData);
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  useEffect(() => {
    setFadeIn(false);
    const timeout = setTimeout(() => {
      const newFilteredData =
        activeFilter === "all"
          ? PMasonryCardData
          : PMasonryCardData.filter((item) =>
              item.filterClass.includes(activeFilter)
            );
      setFilteredData(newFilteredData);
      setFadeIn(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [activeFilter]);

  return (
    <div className="section-padding">
      <div className="container">
        <div className="row">
          <ul className="project-menu mb-0">
            <li className="list-inline-item">
              <a
                className={activeFilter === "all" ? "active" : ""}
                onClick={() => setActiveFilter("all")}
              >
                All Project
              </a>
            </li>
            <li className="list-inline-item">
              <a
                className={activeFilter === "installation" ? "active" : ""}
                onClick={() => setActiveFilter("installation")}
              >
                Installation
              </a>
            </li>
            <li className="list-inline-item">
              <a
                className={activeFilter === "repair" ? "active" : ""}
                onClick={() => setActiveFilter("repair")}
              >
                Repair
              </a>
            </li>
            <li className="list-inline-item">
              <a
                className={activeFilter === "inspection" ? "active" : ""}
                onClick={() => setActiveFilter("inspection")}
              >
                Inspection
              </a>
            </li>
            <li className="list-inline-item">
              <a
                className={activeFilter === "renovation" ? "active" : ""}
                onClick={() => setActiveFilter("renovation")}
              >
                Renovation
              </a>
            </li>
          </ul>
        </div>
        <div
          className={`row project-filter mt-30 ${
            fadeIn ? "fade-in" : "fade-out"
          }`}
        >
          {filteredData.map((item, i) => (
            <div
              className={`col-lg-4 col-md-6 project-item ${item.filterClass}`}
              key={i}
            >
              <PMasonryCard pMasonryCardData={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectMasonry;

import BorderedBtn from "@/components/shared/button/bordered-btn";
import Project1Card from "@/components/shared/card/project1-card";
import SectionTitle from "@/components/shared/section/section-title";
import { Project3CardData } from "@/data/project3-card-seeds";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Project3({}) {
  return (
    <div className="project-section project-three section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-8 ">
            <SectionTitle
              title="We Provide you the Highest Quality Work"
              subTitle="Recent Project"
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-4 text-lg-end d-none d-lg-inline-block">
            <BorderedBtn href="/project-grid" text="All Project" />
          </div>
        </div>

        <div className="row gy-4 mt-40">
          {Project3CardData.map((item, i) => {
            return (
              <div
                className={`col-xl-4 col-lg-4 col-md-6 ${item.conditionalClass}`}
                key={i}
              >
                {item.conditionalClass ? (
                  <Link href={item.href} className="single-project-wrapper">
                    <div className="project-bg">
                      <Image
                        src={item.src}
                        width={376}
                        height={376}
                        alt={item.alt}
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                      <div className="project-details">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Project1Card project1CardData={item} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Project3;

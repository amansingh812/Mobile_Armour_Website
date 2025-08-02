import Project1Card from "@/components/shared/card/project1-card";
import SectionTitle from "@/components/shared/section/section-title";
import { Project1CardData } from "@/data/project1-card-seeds";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Project1({ }) {
  return (
    <div className="project-section project-three section-padding pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-6 text-center ">
            <SectionTitle
              title="We Provide you the Highest Quality Products"
              subTitle="Exploare Our Products"
            />
          </div>
        </div>
        <div className="row gy-4 mt-40">
          {Project1CardData.map((item, i) => {
            const colClass =
              i < 2
                ? "col-xl-6 col-lg-6 col-md-6"
                : "col-xl-4 col-lg-4 col-md-6";
            return (
              <div
                className={`${colClass} ${item.conditionalClass || ""}`}
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

export default Project1;

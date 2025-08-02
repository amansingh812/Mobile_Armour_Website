"use client";
import React, { useState } from "react";
import SectionTitle from "@/components/shared/section/section-title";
import { processSteps } from "@/data/process3-seeds";
import PrimaryBtn from "@/components/shared/button/primary-btn";
import Image from "next/image";

function Process3() {
  const [activeTab, setActiveTab] = useState(processSteps[0].id); // Set default active tab

  return (
    <div className="process-section section-padding pt-0">
      <div className="container">
        <div className="row">
          <div className="row justify-content-center">
            <div className="col-xl-8 text-center">
              <SectionTitle
                title="Working Process in 3 Steps"
                subTitle="What We Offer"
              />
            </div>
          </div>
        </div>
        <div className="row gx-5 justify-content-center">
          <nav>
            <div
              className="nav project-list justify-content-center"
              role="tablist"
            >
              {processSteps.map((step) => (
                <button
                  key={step.id}
                  className={`nav-link ${
                    activeTab === step.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(step.id)}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === step.id}
                >
                  {step.id}
                </button>
              ))}
            </div>
          </nav>
          <div className="tab-content mt-60">
            {processSteps.map((step) => (
              <div
                key={step.id}
                className={`tab-pane fade ${
                  activeTab === step.id ? "show active" : ""
                }`}
              >
                <div className="row align-items-center">
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="process-content-wrap">
                      <div className="section-title">
                        <h6>{step.step}</h6>
                        <h2>{step.title}</h2>
                      </div>
                      <p>{step.description}</p>
                      <PrimaryBtn
                        href="/service-details"
                        text="Read More"
                        className="mt-30"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="process-bg-wrap">
                      <Image
                        src={step.image}
                        width={576}
                        height={383}
                        alt="img"
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Process3;

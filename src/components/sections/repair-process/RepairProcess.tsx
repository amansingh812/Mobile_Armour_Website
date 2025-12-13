"use client";
import SectionTitle from "@/components/shared/section/section-title";
import React from "react";

function RepairProcess() {
  const steps = [
    {
      number: "01",
      icon: "fa-solid fa-calendar-check",
      title: "Book or Walk-In",
      description: "Schedule online or visit us at Warringal Shopping Centre. No appointment needed!",
    },
    {
      number: "02",
      icon: "fa-solid fa-magnifying-glass",
      title: "Free Diagnosis",
      description: "Our technicians assess your device and provide a transparent quote in 15 minutes.",
    },
    {
      number: "03",
      icon: "fa-solid fa-screwdriver-wrench",
      title: "Quick Repair",
      description: "Most repairs completed in 30-60 minutes with high-quality parts and expert care.",
    },
    {
      number: "04",
      icon: "fa-solid fa-circle-check",
      title: "Quality Check & Warranty",
      description: "Every device tested thoroughly. Enjoy 6-month warranty on all repairs.",
    },
  ];

  return (
    <div className="repair-process-section section-padding" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        <div className="row align-items-center service-title">
          <div className="col-xl-8 col-lg-8">
            <SectionTitle
              title="How Our Repair Process Works"
              subTitle="Simple & Fast"
            />
          </div>
        </div>
        <div className="row mt-60 g-4">
          {steps.map((step, index) => (
            <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
              <div
                className="process-step-item text-center"
                style={{
                  padding: "40px 25px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                  position: "relative",
                  height: "100%",
                  transition: "all 0.3s ease",
                  border: "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF5600";
                  e.currentTarget.style.borderColor = "#FF5600";
                  const title = e.currentTarget.querySelector(".process-title") as HTMLElement;
                  const desc = e.currentTarget.querySelector(".process-description") as HTMLElement;
                  const icon = e.currentTarget.querySelector(".process-icon i") as HTMLElement;
                  const num = e.currentTarget.querySelector(".process-number") as HTMLElement;
                  if (title) title.style.color = "#ffffff";
                  if (desc) desc.style.color = "#ffffff";
                  if (icon) icon.style.color = "#ffffff";
                  if (num) num.style.color = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                  e.currentTarget.style.borderColor = "transparent";
                  const title = e.currentTarget.querySelector(".process-title") as HTMLElement;
                  const desc = e.currentTarget.querySelector(".process-description") as HTMLElement;
                  const icon = e.currentTarget.querySelector(".process-icon i") as HTMLElement;
                  const num = e.currentTarget.querySelector(".process-number") as HTMLElement;
                  if (title) title.style.color = "#1a1a1a";
                  if (desc) desc.style.color = "#666";
                  if (icon) icon.style.color = "#FF5600";
                  if (num) num.style.color = "rgba(0,0,0,0.05)";
                }}
              >
                <div
                  className="process-number"
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontSize: "60px",
                    fontWeight: "bold",
                    color: "rgba(0,0,0,0.05)",
                    lineHeight: "1",
                    transition: "color 0.3s ease",
                  }}
                >
                  {step.number}
                </div>
                <div
                  className="process-icon"
                  style={{
                    fontSize: "50px",
                    marginBottom: "20px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <i
                    className={step.icon}
                    style={{
                      color: "#FF5600",
                      transition: "color 0.3s ease",
                    }}
                  ></i>
                </div>
                <h5
                  className="process-title fw-bold mb-3"
                  style={{
                    fontSize: "18px",
                    color: "#1a1a1a",
                    transition: "color 0.3s ease",
                  }}
                >
                  {step.title}
                </h5>
                <p
                  className="process-description mb-0"
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.6",
                    transition: "color 0.3s ease",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RepairProcess;

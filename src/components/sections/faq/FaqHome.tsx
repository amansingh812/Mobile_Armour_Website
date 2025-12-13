"use client";
import FaqItem from "@/components/shared/card/faq-item";
import SectionTitle from "@/components/shared/section/section-title";
import { FaqItemData } from "@/data/faq1.item-seeds";
import React, { useState } from "react";

function FaqHome() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="faq-section section-padding" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <SectionTitle
              title="Common Questions About Mobile Repairs"
              subTitle="FAQ"
            />
          </div>
        </div>
        <div className="row mt-60 justify-content-center">
          <div className="col-xl-10 col-lg-12">
            <div className="cp-custom-accordion">
              <div className="accordions" id="accordionExample">
                {FaqItemData &&
                  FaqItemData.map((faq, index) => (
                    <FaqItem
                      key={index}
                      id={index}
                      question={faq.question}
                      answer={faq.answer}
                      setActiveIndex={setActiveIndex}
                      activeIndex={activeIndex}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-40">
          <div className="col-lg-12 text-center">
            <p style={{ fontSize: "16px", color: "#666" }}>
              Still have questions?{" "}
              <a
                href="tel:+61405326205"
                style={{
                  color: "#FF5600",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Call us at 0405 326 205
              </a>{" "}
              or{" "}
              <a
                href="/contact"
                style={{
                  color: "#FF5600",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                contact us online
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqHome;

"use client";
import FaqItem from "@/components/shared/card/faq-item";
import SectionTitle from "@/components/shared/section/section-title";
import { FaqItemData } from "@/data/faq1.item-seeds";
import Image from "next/image";
import React, { useState } from "react";
import CountUp from "react-countup";

function Faq2({}) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="faq-section section-padding pt-80">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="section-title">
              <SectionTitle
                title="Roofing Excellence Above and Beyond"
                subTitle="FAQ"
              />
            </div>
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
          <div className="col-xl-6 col-lg-6 text-lg-end">
            <div className="counter-wrap">
              <div className="counter-img">
                <Image
                  src="/img/counter-bg.jpg"
                  width={576}
                  height={697}
                  alt="img"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div className="counter-content">
                <div className="single-counter-item dark-bg">
                  <h6>Happy Clients</h6>
                  <h1>
                    <span className="counter-number">
                      <CountUp end={124} enableScrollSpy={true} />
                    </span>
                    +
                  </h1>
                  <p>Adipiscing elit, do eiusm.</p>
                </div>
                <div className="single-counter-item theme-bg">
                  <h6>Year of Experience</h6>
                  <h1>
                    <span className="counter-number">
                      <CountUp end={16} enableScrollSpy={true} />
                    </span>
                    +
                  </h1>
                  <p>Sed do eiusmod tempor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq2;

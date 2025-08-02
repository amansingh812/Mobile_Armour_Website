"use client";

import FaqItem from "@/components/shared/card/faq-item";
import { FaqItemData } from "@/data/faq1.item-seeds";
import React, { useState } from "react";

function FaqItems({}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="faq-section gray-bg section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-8 mb-50">
            <div className="cp-custom-accordion">
              <div className="accordions" id="accordionExample">
                {FaqItemData &&
                  FaqItemData.map((faq, index) => (
                    <FaqItem
                      key={faq.id}
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
      </div>
    </div>
  );
}

export default FaqItems;

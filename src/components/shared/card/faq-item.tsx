"use client";

import React, { useState } from "react";

interface FaqItemProps {
  id: number;
  question: string;
  answer: string;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
}

const FaqItem: React.FC<FaqItemProps> = ({
  id,
  question,
  answer,
  setActiveIndex,
  activeIndex,
}) => {
  return (
    <div className="accordion-items">
      <h2 className="accordion-header">
        <button
          onClick={() => setActiveIndex(id)}
          className={`accordion-buttons ${
            activeIndex === id ? "" : "collapsed"
          }`}
          type="button"
        >
          <span></span>
          {question}
        </button>
      </h2>
      <div
        className={`accordion-collapse collapse ${
          activeIndex === id ? "show" : ""
        }`}
      >
        <div className="accordion-body">{answer}</div>
      </div>
    </div>
  );
};

export default FaqItem;

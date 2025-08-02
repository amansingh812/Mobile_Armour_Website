"use client";
import React from "react";
import CountUp from "react-countup";

function Counter1({}) {
  return (
    <div
      id="counter-1"
      className="counter-section dark-bg section-padding pt-50 pb-0"
    >
      <div className="container">
        <div className="row gx-0">
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="single-counter-box">
              <p className="counter-number">
                <CountUp end={238} enableScrollSpy={true} />
              </p>
              <span className="counter-symbol">+</span>
              <h6>Project Completed</h6>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="single-counter-box">
              <p className="counter-number">
                <CountUp end={90} enableScrollSpy={true} />
              </p>
              <span className="counter-symbol">%</span>
              <h6>Client Satisfaction</h6>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="single-counter-box">
              <p className="counter-number">
                <CountUp end={15} enableScrollSpy={true} />
              </p>
              <span className="counter-symbol">+</span>
              <h6>Year of Experience</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter1;

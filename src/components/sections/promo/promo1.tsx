"use client";
import SectionTitle from "@/components/shared/section/section-title";
import React, { useEffect } from "react";
import useInViewport from "@/hooks/useInViewport";
import CountUp from "react-countup";
interface Promo1Props {
  title?: string;
  subTitle?: string;
  sectionClass?: string;
}
function Promo1({
  subTitle = "Custom Order",
  title = "We Are Committed to Best Service",
  sectionClass,
}: Promo1Props) {
  const ProgressBar = ({
    percentage,
    barColor,
    duration,
  }: {
    percentage: number;
    barColor: string;
    duration: number;
  }) => {
    const { ref, isInViewport } = useInViewport({
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });
    useEffect(() => {
      const bar = document.querySelector(`#bar-${percentage}`) as HTMLElement;
      if (bar && isInViewport) {
        bar.style.transition = `width ${duration}ms ease-in-out`;
        bar.style.width = `${percentage}%`;
      } else {
        bar.style.width = `0%`;
      }
    }, [percentage, duration, isInViewport]);

    return (
      <div
        className="progress-bar-wrapper"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <div className="bar-background">
          <div
            id={`bar-${percentage}`}
            className="bar-fill"
            style={{
              width: "0%",
              backgroundColor: barColor,
            }}
          ></div>
        </div>
      </div>
    );
  };
  const bars = [
    {
      title: "Screen Replacement",
      percentage: 90,
      barColor: "#FE574F",
      duration: 5000,
    },
    {
      title: "Battery Replacement",
      percentage: 70,
      barColor: "#FE574F",
      duration: 5000,
    },
    {
      title: "Iphone Unlock",
      percentage: 80,
      barColor: "#FE574F",
      duration: 5000,
    },
  ];

  return (
    <div className={`promo-section section-padding  ${sectionClass ?? "pt-0"}`}>
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="client-content-wrap">
              <SectionTitle title={title} subTitle={subTitle} />
              <p>
                We treat every device as if it were our own because your trust is what drives us. Whether it’s a shattered screen, battery issue, or water damage emergency, we’re here to get you back connected—quickly, affordably, and flawlessly.
              </p>
              <div className="contact-info-wrap">
                <div className="contact-icon">
                  <i className="las la-envelope"></i>
                </div>
                <div className="contact-text">
                  <p>Manager@mobilearmour.com.au</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="progress-bar-area">
              {bars.map((bar, index) => (
                <div key={index} className="bar-wrapper">
                  <div className="single-bar-item">
                    <h5>{bar.title}</h5>
                    <div className="bar-percentage fw-semibold">
                      <CountUp
                        end={bar.percentage}
                        enableScrollSpy={true}
                        duration={7}
                      />
                      %
                    </div>
                  </div>
                  <ProgressBar
                    percentage={bar.percentage}
                    barColor={bar.barColor}
                    duration={bar.duration}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promo1;

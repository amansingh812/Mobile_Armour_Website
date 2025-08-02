"use client";
import PrimaryBtn from "@/components/shared/button/primary-btn";
import SectionTitle from "@/components/shared/section/section-title";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";
interface About3Props {
  title?: string;
  subTitle?: string;
  sectionClass?: string;
}
function About3({
  title = "Designed To Grow Your Business",
  subTitle = "Raising the Standard Protect Your Home",
  sectionClass,
}: About3Props) {
  return (
    <div
      id="about-3"
      className={`about-section about-three ${sectionClass ?? "section-padding pt-0"
        }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 order-2 order-lg-1">
            <div className="about-content-wrap">
              <SectionTitle title={title} subTitle={subTitle} />
              <div className="p-animation">
                <p>
                  We specialize in fast, reliable, and high-quality repairs for all major smartphone brands, including Apple, Samsung, OnePlus, Xiaomi, and more. Whether it’s a cracked screen, worn-out battery, water damage, charging issue, or complex software problem — we’ve got you covered. Every repair is handled by certified technicians with years of experience, using premium-grade replacement parts to ensure lasting performance and peace of mind. We also offer transparent pricing, quick turnaround times, and warranty-backed services to give you confidence in every fix. Your device is in expert hands from drop-off to pickup.                </p>
              </div>
              {/* <div className="row mt-60">
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="single-counter-box">
                    <p className="counter-number">
                      <CountUp end={310} enableScrollSpy={true} />
                    </p>
                    <span className="counter-symbol">+</span>
                    <h6>Project Completed</h6>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="single-counter-box">
                    <p className="counter-number">
                      <CountUp end={156} enableScrollSpy={true} />
                    </p>
                    <span className="counter-symbol">+</span>
                    <h6>Satified Clients</h6>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="single-counter-box">
                    <p className="counter-number">
                      <CountUp end={76} enableScrollSpy={true} />
                    </p>
                    <span className="counter-symbol"></span>
                    <h6>Awards Win</h6>
                  </div>
                </div>
              </div> */}
              {/* <PrimaryBtn
                href="/services"
                text="View Services"
                className="mt-40 "
              /> */}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 text-lg-end order-1 order-lg-2 ">
            <div className="about-bg-wrapper">
              <Image
                src="/img/about/about-3-11.jpg"
                width={450}
                height={543}
                alt="alt"

              />
              {/* <div className="small-img">
                <Image
                  src="/img/about/about-3-22.jpg"
                  width={239}
                  height={256}
                  alt="alt"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About3;

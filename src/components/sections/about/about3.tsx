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
                  We provide fast, reliable, and high-quality mobile device servicing for all major brands. From screen replacement and battery change to diagnostics and performance restoration — our certified technicians ensure top-notch results using premium-grade components. Each service is performed with care and precision to maintain your device’s quality and reliability. Enjoy transparent pricing, priority turnaround, and warranty-backed workmanship for complete peace of mind. Your device stays in expert hands from drop-off to pickup.  </p>
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
                src="https://res.cloudinary.com/drygcfes5/image/upload/v1759825506/IMG_2399_yzox8d.jpg"
                width={450}
                height={543}
                alt="Smartphone repair service"
                style={{
                  
                  borderRadius: '2px',
                  boxSizing: 'border-box'
                }}
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

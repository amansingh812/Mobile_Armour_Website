import PrimaryBtn from "@/components/shared/button/primary-btn";
import Image from "next/image";
import React from "react";

function About2({}) {
  return (
    <div id="about-2" className="about-section section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 ">
            <div className="about-img-wrap">
              <Image
                src="/img/about/about-2-1.jpg"
                width={500}
                height={575}
                alt="alt"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
              <div className="experience-wrap">
                <span>25+</span>
                <p>Year of Experience</p>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 ">
            <div className="about-content-wrap">
              <div className="section-title">
                <h6>About Us</h6>
                <h2>We Make High Quality Roofing Services</h2>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur. Amet lectus mi ultricies
                the dictum facilisis thr sem. Imperdiet massa turpis sit Lorem
                ipsum dolor sit amet consectetur amet a lectus mi ultricies the
                man
              </p>
              <div className="feature-service">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <div className="single-feat-service">
                      <div className="feat-icon">
                        <Image
                          src="/img/feature/worker.png"
                          width={50}
                          height={50}
                          alt="alt"
                        />
                      </div>
                      <div className="feat-content">
                        <h4>Professional Staff</h4>
                        <p>
                          Overall, professional the man <br /> Engineers play
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="single-feat-service">
                      <div className="feat-icon">
                        <Image
                          src="/img/feature/customer-service.png"
                          width={50}
                          height={50}
                          alt="alt"
                        />
                      </div>
                      <div className="feat-content">
                        <h4>Customer Support</h4>
                        <p>
                          Overall, professional the man <br /> Engineers play
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <PrimaryBtn href="/about" text="Learn More" className="mt-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About2;

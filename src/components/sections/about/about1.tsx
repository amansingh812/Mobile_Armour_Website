import PrimaryBtn from "@/components/shared/button/primary-btn";
import Image from "next/image";
import React from "react";

interface About1Props {
  type?: string;
}

function About1({ type }: About1Props) {
  return (
    <div
      className={`about-section section-padding   ${type === "type-1" ? "gray-bg" : ""
        }`}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 ">
            <div className="about-img-wrap">
              <div className="image-one">
                <Image
                  src="/img/about/about-1-11.png"
                  width={403}
                  height={538}
                  alt="about image"
                  style={{
                    width: "100%",
                    height: "auto",

                  }}
                />
              </div>
              <div className="image-two ">
                <div className="circular-image-container">
                  <Image
                    src="/img/about/about_.png"
                    width={317}
                    height={348}
                    alt="about image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 ">
            <div className="about-content-wrap">
              <div className="section-title">
                <h6>About Us</h6>
                <h2>
                  We Fix Your Devices <br /> Fast & Reliable!
                </h2>
              </div>
              <p>
                At Mobile Armour, we believe your phone shouldn’t stay broken. Whether it’s a shattered screen, dying battery, or mysterious software glitch, our expert technicians deliver high-quality repairs to get you back online quickly—without the hassle.{" "}
              </p>
              <div className="about-list-item">
                <ul>
                  <li>
                    <i className="fa-solid fa-circle-check"></i>Smartphone Body Repair{" "}
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i>Universal Unlocking{" "}
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i>Water Damage Repair
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i>Speaker Microphone Fix
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i>Broken LCD Repair
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i>Battery Replacement
                  </li>
                </ul>
              </div>
              {/* <PrimaryBtn href="about" text="Learn More" className="mt-40" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About1;

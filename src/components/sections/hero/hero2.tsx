"use client";
import PrimaryBtn from "@/components/shared/button/primary-btn";
import "reactjs-popup/dist/index.css";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import RoofixPopup from "./roofix-popup";
import Image from "next/image";

function Hero2() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);   

  const imageUrl = "/img/slider/slider-47.jpg";
 
  return (
    <div className="hero-area hero-two theme-bg bg-cover d-flex align-items-center">
      <Image
        src={imageUrl}
        alt="Responsive Image"
        fill
        style={{ objectFit: "cover" }}
      />
      <div className="overlay-1"></div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-7 col-lg-7 col-md-8">
            <div className="hero-area-content">
              <div className="section-title">
                <h6 className="text-white fadeInDown animated">
                  Welcome to Mobile Armour
                </h6>
                <h1 className="text-white ">
                Your Trusted Partner for Mobile Repair
                </h1>
              </div>
              <p className="text-white mt-30 ">
              Need a quick fix for your phone or tablet? Smart Solutions has you covered! We specialize in fast, affordable repairs for all major brands.
              </p>
              <div className="hero-btn mt-40  d-flex align-items-center flex-wrap">
                <PrimaryBtn
                  text="Our Services"
                  href="/services"
                  className="mr-35 position-relative z-1"
                />
                {/* <div className="video-wrap d-inline-flex align-items-center mt-0">
                  {isClient && (
                    <RoofixPopup>
                      <ReactPlayer
                        width="100%"
                        height={500}
                        url="https://www.youtube.com/watch?v=hvSq38FChGU"
                        controls
                      />
                    </RoofixPopup>
                  )}
                  <span className="text-white position-relative z-1">See How It Works</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero2;

"use client";
import PrimaryBtn from "@/components/shared/button/primary-btn";
import "reactjs-popup/dist/index.css";
import React, { useState, useEffect } from "react";

import Image from "next/image";

function Hero2() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);   

  const imageUrl = "https://res.cloudinary.com/drygcfes5/image/upload/v1761373429/sayan-majhi-URx9u4LIHHE-unsplash_an7bsb.jpg"; 
 
  return (
    <div className="hero2-wrapper">
      <div className="hero-area hero-two theme-bg bg-cover d-flex align-items-center hero2-rounded">
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
                 
                  <h2 className="text-white ">
                  Get a grip on <br></br>
              your key essentials.
                  </h2>
                </div>              
                <div className="hero-btn mt-40  d-flex align-items-center flex-wrap">
                  <PrimaryBtn
                    text="Explore More"
                    href="/products"
                    className="mr-35 position-relative z-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero2;

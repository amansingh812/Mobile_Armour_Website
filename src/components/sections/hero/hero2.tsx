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
          alt="Mobile Phone Repair Service Heidelberg"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="overlay-1"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7">
              <div className="hero-area-content" style={{ padding: '20px 0' }}>
                <div className="section-title">
                  <span 
                    className="text-white hero2-badge" 
                    style={{ 
                      fontSize: 'clamp(13px, 3.5vw, 18px)', 
                      fontWeight: '500', 
                      display: 'block', 
                      marginBottom: '12px',
                      lineHeight: '1.4'
                    }}
                  >
                    <i className="fa-brands fa-apple"></i> Apple Authorised Repair Provider<br className="d-sm-none" /> • ⭐ 5.0 on Google • 6-Month Warranty
                  </span>
                  <h2 
                    className="text-white hero2-title" 
                    style={{
                      fontSize: 'clamp(24px, 6vw, 48px)',
                      lineHeight: '1.2',
                      marginBottom: '16px',
                      wordWrap: 'break-word'
                    }}
                  >
                    Melbourne's Trusted Apple Authorised Repair Experts
                  </h2>
                  <ul 
                    className="hero2-list" 
                    style={{ 
                      listStyle: 'none', 
                      padding: '12px 0 0 0', 
                      margin: '30px 0 25px 0',
                      color: '#fff'
                    }}
                  >
                    {[
                      "Apple Authorised — Genuine Apple Parts",
                      "IRP Certified Technicians",
                      "Same-day service — all major brands",
                      "Warringal Shopping Centre, Heidelberg"
                    ].map((item, idx) => (
                      <li 
                        key={idx} 
                        style={{ 
                          fontSize: 'clamp(14px, 3.5vw, 17px)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          marginBottom: '8px'
                        }}
                      >
                        <i className="fa-light fa-circle-check" style={{ color: '#ff5722' }}></i>
                        {item}
                      </li>
                    ))}
                  </ul>
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

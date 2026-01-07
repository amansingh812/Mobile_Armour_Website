"use client";
import React from "react";
import Link from "next/link";

export default function ServiceSummary() {
  const topServices = [
    {
      icon: "fa-solid fa-mobile-screen-button",
      title: "Screen Replacement",
      description: "Cracked or broken screens repaired with quality parts. Most repairs in 30 minutes.",
      price: "from $79"
    },
    {
      icon: "fa-solid fa-battery-three-quarters",
      title: "Battery Replacement",
      description: "Not holding charge? We replace batteries for all major phone brands quickly.",
      price: "from $59"
    },
    {
      icon: "fa-solid fa-droplet",
      title: "Water Damage Repair",
      description: "Dropped in water? Fast diagnosis and repair to save your device and data.",
      price: "from $89"
    }
  ];

  return (
    <div className="service-summary-section">
      <div className="container">
        {/* Section Header */}
        <div className="row">
          <div className="col-12 text-center mb-50">
            <div className="section-title">
              <span className="section-subtitle">Our Expert Services</span>
              <h2>Professional Phone Repair Services in Heidelberg</h2>
              <p className="section-description">
                We repair screens, batteries, charging ports, cameras, water damage and more for iPhone, Samsung, Google, and all major brands
              </p>
            </div>
          </div>
        </div>

        {/* Top 3 Services */}
        <div className="row g-4 mb-40">
          {topServices.map((service, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="service-summary-card">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-price">{service.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="row">
          <div className="col-12 text-center">
            <div className="service-cta-wrapper">
              <p className="cta-text">
                <strong>Need something else?</strong> We also fix charging ports, cameras, buttons, speakers, and more.
              </p>
              <div className="cta-buttons">
                <Link href="/services" className="theme-btn mr-3">
                  <i className="fa-light fa-wrench mr-2"></i>
                  View All Services & Pricing
                </Link>
                <Link href="/contact" className="theme-btn theme-btn-secondary">
                  <i className="fa-light fa-calendar-check mr-2"></i>
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .service-summary-section {
          padding: 80px 0;
          background: #fff;
        }

        .section-subtitle {
          color: #ff5722;
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 10px;
        }

        .section-title h2 {
          font-size: clamp(28px, 5vw, 36px);
          font-weight: 700;
          color: #212529;
          margin-bottom: 15px;
          line-height: 1.3;
          word-wrap: break-word;
        }

        .section-description {
          font-size: clamp(14px, 3vw, 16px);
          color: #6c757d;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          padding: 0 15px;
        }

        .service-summary-card {
          background: #fff;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: clamp(25px, 5vw, 35px) clamp(20px, 4vw, 25px);
          text-align: center;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .service-summary-card:hover,
        .service-summary-card:active {
          border-color: #ff5722;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 87, 34, 0.15);
        }

        .service-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ff5722 0%, #e64a19 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: #fff;
          font-size: 36px;
          transition: all 0.3s ease;
        }

        .service-summary-card:hover .service-icon {
          transform: scale(1.1);
        }

        .service-summary-card h3 {
          font-size: clamp(18px, 4vw, 22px);
          font-weight: 700;
          color: #212529;
          margin-bottom: 12px;
          word-wrap: break-word;
        }

        .service-summary-card p {
          font-size: clamp(13px, 3vw, 15px);
          color: #6c757d;
          line-height: 1.6;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .service-price {
          font-size: clamp(18px, 4vw, 20px);
          font-weight: 700;
          color: #ff5722;
          padding: 8px 16px;
          background: #fff3f0;
          border-radius: 6px;
          white-space: nowrap;
        }

        .service-cta-wrapper {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 12px;
          padding: clamp(25px, 5vw, 40px) clamp(20px, 4vw, 30px);
          margin-top: 20px;
        }

        .cta-text {
          font-size: clamp(15px, 3.5vw, 18px);
          color: #495057;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .cta-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .theme-btn {
          display: inline-flex;
          align-items: center;
          padding: 15px 30px;
          background: #ff5722;
          color: #fff;
          border-radius: 6px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid #ff5722;
        }

        .theme-btn:hover {
          background: #e64a19;
          border-color: #e64a19;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 87, 34, 0.3);
        }

        .theme-btn-secondary {
          background: #fff;
          color: #ff5722;
        }

        .theme-btn-secondary:hover {
          background: #ff5722;
          color: #fff;
        }

        @media (max-width: 767px) {
          .service-summary-section {
            padding: 50px 0;
          }

          .section-title h2 {
            font-size: 24px;
          }

          .service-summary-card {
            padding: 25px 20px;
          }

          .service-icon {
            width: 65px;
            height: 65px;
            font-size: 30px;
          }

          .service-cta-wrapper {
            padding: 25px 20px;
          }

          .cta-buttons {
            flex-direction: column;
            gap: 10px;
          }

          .theme-btn {
            width: 100%;
            justify-content: center;
            font-size: 15px;
            padding: 14px 24px;
          }
        }

        @media (max-width: 575px) {
          .service-summary-section {
            padding: 40px 0;
          }

          .mb-50 {
            margin-bottom: 30px !important;
          }

          .mb-40 {
            margin-bottom: 25px !important;
          }

          .service-icon {
            width: 60px;
            height: 60px;
            font-size: 28px;
            margin-bottom: 15px;
          }

          .service-summary-card h3 {
            font-size: 18px;
            margin-bottom: 10px;
          }

          .service-summary-card p {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

"use client";
import SectionTitle from "@/components/shared/section/section-title";
import { Service1CardData } from "@/data/service1-card-seeds";
import Image from "next/image";
import React, { useState } from "react";

function ServiceMobile() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIcon {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }

        @keyframes slideArrowRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(4px);
          }
        }

        .mobile-services-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mobile-service-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          border: 2px solid #f0f0f0;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .mobile-service-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #FF5600 0%, #ff6b5d 100%);
          transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .mobile-service-item.active::before {
          left: 0;
        }

        .mobile-service-item.active {
          border-color: #FF5600;
          box-shadow: 0 8px 20px rgba(254, 87, 79, 0.25);
        }

        .service-icon {
          flex-shrink: 0;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #FF5600 0%, #ff6b5d 100%);
          border-radius: 12px;
          padding: 12px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
          box-shadow: 0 2px 8px rgba(254, 87, 79, 0.2);
        }

        .service-icon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent);
          border-radius: 12px;
          z-index: 0;
        }

        .mobile-service-item.active .service-icon {
          background: linear-gradient(135deg, #ff6b5d 0%, #FF5600 100%);
          transform: scale(1.12);
          box-shadow: 0 6px 16px rgba(254, 87, 79, 0.35);
        }

        .service-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
          position: relative;
          z-index: 1;
        }

        .mobile-service-item.active .service-icon img {
          transform: scale(1.15);
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.15));
        }

        .service-content {
          flex: 1;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .service-titlemobileview  {
        margin-top: 5px
          font-size: 17px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.5;
          transition: color 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        
          padding: 0;
          display: block;
        }

        .mobile-service-item.active .titlemobileview  {
          color: #ffffff;
        }

        .service-arrow {
          flex-shrink: 0;
          font-size: 20px;
          color: #FF5600;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }

        .mobile-service-item.active .service-arrow {
          color: #ffffff;
          transform: translateX(4px);
        }

        .service-mobile-section {
          display: block;
        }

        @media (min-width: 768px) {
          .service-mobile-section {
            display: none !important;
          }
        }
      `}</style>

      <div className="service-mobile-section py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <SectionTitle
                title="Our Mobile Services"
                subTitle="Services"
              />
            </div>
          </div>
          <div className="row mt-6">
            <div className="col-12">
              <div className="mobile-services-list">
                {Service1CardData &&
                  Service1CardData.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className={`mobile-service-item ${activeIndex === i ? "active" : ""}`}
                      style={{
                        animation: `slideInUp 0.5s ease-out ${i * 0.08}s both`,
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(null)}
                      onTouchStart={() => setActiveIndex(i)}
                      onTouchEnd={() => setTimeout(() => setActiveIndex(null), 200)}
                    >
                      <div className="service-icon">
                        <Image
                          src={item.src}
                          width={35}
                          height={35}
                          alt={item.alt}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div className="service-content">
                        <h5 className="service-titlemobileview">
                          {item.title}
                        </h5>
                      </div>
                      <div className="service-arrow">
                        <i className="las la-arrow-right"></i>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceMobile;

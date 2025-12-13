"use client";
import { IService1CardData } from "@/data/service1-card-seeds";
import Image from "next/image";
import React, { useState } from "react";

interface ServiceMobileCardProps {
  service1CardData: IService1CardData;
  index?: number;
}

function ServiceMobileCard({ service1CardData, index = 0 }: ServiceMobileCardProps) {
  const [isActive, setIsActive] = useState(false);

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

        .service-mobile-card-wrapper {
          animation: slideInUp 0.5s ease-out ${index * 0.08}s both;
        }

        .service-mobile-card {
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
          display: block;
        }

        .service-mobile-card::before {
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

        .service-mobile-card.active::before {
          left: 0;
        }

        .service-mobile-card.active {
          border-color: #FF5600;
          box-shadow: 0 8px 20px rgba(254, 87, 79, 0.25);
        }

        .service-mobile-card-icon {
          flex-shrink: 0;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 10px;
          padding: 8px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .service-mobile-card.active .service-mobile-card-icon {
          background: rgba(255, 255, 255, 0.95);
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(254, 87, 79, 0.2);
        }

        .service-mobile-card-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .service-mobile-card.active .service-mobile-card-icon img {
          transform: scale(1.1);
        }

        .service-mobile-card-content {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .service-mobile-card-title {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.4;
          transition: color 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .service-mobile-card.active .service-mobile-card-title {
          color: #ffffff;
        }

        .service-mobile-card-arrow {
          flex-shrink: 0;
          font-size: 20px;
          color: #FF5600;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }

        .service-mobile-card.active .service-mobile-card-arrow {
          color: #ffffff;
          transform: translateX(4px);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .service-mobile-card {
            padding: 12px 14px;
            gap: 10px;
          }

          .service-mobile-card-icon {
            width: 40px;
            height: 40px;
          }

          .service-mobile-card-title {
            font-size: 14px;
          }

          .service-mobile-card-arrow {
            font-size: 18px;
          }
        }
      `}</style>

      <div className="service-mobile-card-wrapper">
        <a
          href={service1CardData.href}
          className={`service-mobile-card ${isActive ? "active" : ""}`}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          onTouchStart={() => setIsActive(true)}
          onTouchEnd={() => setTimeout(() => setIsActive(false), 200)}
        >
          <div className="service-mobile-card-icon">
            <Image
              src={service1CardData.src}
              width={35}
              height={35}
              alt={service1CardData.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div className="service-mobile-card-content">
            <h5 className="service-mobile-card-title">
              {service1CardData.title}
            </h5>
          </div>
          <div className="service-mobile-card-arrow">
            <i className="las la-arrow-right"></i>
          </div>
        </a>
      </div>
    </>
  );
}

export default ServiceMobileCard;

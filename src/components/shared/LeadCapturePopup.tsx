"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function LeadCapturePopup() {
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    {
      icon: "fa-mobile-screen-button",
      title: "Screen Repairs",
      description: "Fast, affordable screen replacements",
      href: "/services",
      color: "#ff5722"
    },
    {
      icon: "fa-battery-three-quarters",
      title: "Battery Replacement",
      description: "Restore your phone's battery life",
      href: "/services",
      color: "#4caf50"
    },
    {
      icon: "fa-droplet",
      title: "Water Damage Repair",
      description: "Expert liquid damage restoration",
      href: "/services",
      color: "#2196f3"
    },
    {
      icon: "fa-screwdriver-wrench",
      title: "General Repairs",
      description: "All phone models & brands",
      href: "/services",
      color: "#ff9800"
    }
  ];

  useEffect(() => {
    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 15000); // 15 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="lead-capture-overlay" onClick={handleClose}>
        <div className="lead-capture-popup" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={handleClose}>
            <i className="fa-solid fa-times"></i>
          </button>

          <div className="popup-header">
            <div className="popup-icon">
              <i className="fa-solid fa-tools"></i>
            </div>
            <h3>Expert Mobile Repair Services</h3>
            <p>Same-day service • All major brands • Located at Warringal Shopping Centre</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <Link 
                key={index} 
                href={service.href} 
                className="service-card"
                onClick={handleClose}
              >
                <div className="service-icon" style={{ backgroundColor: service.color }}>
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
                <div className="service-content">
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </div>
                <div className="service-arrow">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </Link>
            ))}
          </div>

          <div className="popup-footer">
            <Link href="/services" className="view-all-btn" onClick={handleClose}>
              View All Services
              <i className="fa-solid fa-chevron-right ml-2"></i>
            </Link>
            <p className="footer-text">
              <i className="fa-solid fa-clock"></i> Open Mon-Sun 9:30am - 5:30pm
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .lead-capture-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .lead-capture-popup {
          background: #fff;
          border-radius: 16px;
          max-width: 580px;
          width: calc(100% - 40px);
          padding: clamp(30px, 6vw, 40px) clamp(25px, 5vw, 35px);
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s ease;
          max-height: 90vh;
          overflow-y: auto;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .close-button {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          font-size: clamp(20px, 4vw, 24px);
          color: #6c757d;
          cursor: pointer;
          width: clamp(36px, 8vw, 40px);
          height: clamp(36px, 8vw, 40px);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
          z-index: 10;
        }

        .close-button:hover,
        .close-button:active {
          background: #f8f9fa;
          color: #212529;
        }

        .popup-header {
          text-align: center;
          margin-bottom: clamp(20px, 4vw, 30px);
        }

        .popup-icon {
          width: clamp(70px, 15vw, 80px);
          height: clamp(70px, 15vw, 80px);
          background: linear-gradient(135deg, #ff5722 0%, #e64a19 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #fff;
          font-size: clamp(35px, 7vw, 40px);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .popup-header h3 {
          font-size: clamp(22px, 5vw, 28px);
          font-weight: 700;
          color: #212529;
          margin-bottom: 12px;
          line-height: 1.3;
          word-wrap: break-word;
        }

        .popup-header p {
          font-size: clamp(13px, 3vw, 15px);
          color: #6c757d;
          margin: 0;
          line-height: 1.5;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 25px;
        }

        .service-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: clamp(14px, 3vw, 16px);
          background: #f8f9fa;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 2px solid transparent;
        }

        .service-card:hover {
          background: #fff;
          border-color: #ff5722;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(255, 87, 34, 0.2);
        }

        .service-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #fff;
          font-size: 22px;
          transition: transform 0.3s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1);
        }

        .service-content {
          flex: 1;
          min-width: 0;
        }

        .service-content h4 {
          font-size: clamp(14px, 3vw, 15px);
          font-weight: 700;
          color: #212529;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .service-content p {
          font-size: clamp(11px, 2.5vw, 12px);
          color: #6c757d;
          margin: 0;
          line-height: 1.4;
        }

        .service-arrow {
          opacity: 0;
          transition: all 0.3s ease;
          color: #ff5722;
          font-size: 16px;
        }

        .service-card:hover .service-arrow {
          opacity: 1;
          transform: translateX(3px);
        }

        .popup-footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: clamp(13px, 3vw, 15px) clamp(24px, 5vw, 30px);
          background: linear-gradient(135deg, #ff5722 0%, #e64a19 100%);
          color: #fff;
          border-radius: 8px;
          font-size: clamp(14px, 3vw, 16px);
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-bottom: 12px;
          -webkit-tap-highlight-color: transparent;
        }

        .view-all-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 87, 34, 0.3);
        }

        .footer-text {
          font-size: clamp(12px, 2.5vw, 13px);
          color: #6c757d;
          margin: 8px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        @media (max-width: 575px) {
          .lead-capture-popup {
            padding: 25px 20px;
            width: calc(100% - 30px);
          }

          .popup-header {
            margin-bottom: 20px;
          }

          .popup-icon {
            width: 65px;
            height: 65px;
            font-size: 32px;
            margin-bottom: 15px;
          }

          .services-grid {
            gap: 10px;
            margin-bottom: 20px;
          }

          .service-card {
            padding: 12px;
          }

          .service-icon {
            width: 42px;
            height: 42px;
            font-size: 20px;
          }

          .popup-footer {
            padding-top: 15px;
          }

          .view-all-btn {
            width: 100%;
          }
        }

        @media (max-width: 400px) {
          .lead-capture-popup {
            width: calc(100% - 20px);
            padding: 20px 16px;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .close-button {
            top: 10px;
            right: 10px;
          }
        }
      `}</style>
    </>
  );
}

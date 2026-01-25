"use client";
import React, { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {/* Mobile Sticky Bottom CTA */}
      <div className={`floating-cta-mobile ${isVisible ? 'visible' : ''}`}>
        <a href="tel:0405326205" className="cta-call">
          <i className="fa-solid fa-phone"></i>
          <span>Call Now</span>
        </a>
        <a href="/contact" className="cta-book">
          <i className="fa-solid fa-calendar-check"></i>
          <span>Book Repair</span>
        </a>
      </div>

      {/* Desktop Floating CTA */}
      <div className={`floating-cta-desktop ${isVisible ? 'visible' : ''}`}>
        <a href="tel:0405326205" className="cta-phone-circle" title="Call us now">
          <i className="fa-solid fa-phone"></i>
        </a>
      </div>

      <style jsx>{`
        /* Mobile Sticky Bottom Bar */
        .floating-cta-mobile {
          position: fixed;
          bottom: -100px;
          left: 0;
          right: 0;
          display: flex;
          gap: 0;
          z-index: 1000;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
          transition: bottom 0.3s ease;
        }

        .floating-cta-mobile.visible {
          bottom: 0;
        }

        .floating-cta-mobile a {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          gap: 6px;
        }

        .cta-call {
          background: #ff5722;
          color: #fff;
        }

        .cta-call:hover {
          background: #e64a19;
          color: #fff;
        }

        .cta-book {
          background: #2196F3;
          color: #fff;
        }

        .cta-book:hover {
          background: #1976D2;
          color: #fff;
        }

        .floating-cta-mobile i {
          font-size: 20px;
        }

        /* Desktop Floating Button */
        .floating-cta-desktop {
          position: fixed;
          left: -80px;
          bottom: 30px;
          z-index: 1000;
          transition: right 0.3s ease;
          display: none;
        }

        .floating-cta-desktop.visible {
          left: 30px;
        }

        .cta-phone-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: #ff5722;
          color: #fff;
          border-radius: 50%;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(255, 87, 34, 0.4);
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }

        .cta-phone-circle:hover {
          background: #e64a19;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(255, 87, 34, 0.6);
        }

        .cta-phone-circle i {
          font-size: 24px;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 4px 16px rgba(255, 87, 34, 0.4);
          }
          50% {
            box-shadow: 0 4px 24px rgba(255, 87, 34, 0.7);
          }
          100% {
            box-shadow: 0 4px 16px rgba(255, 87, 34, 0.4);
          }
        }

        /* Show mobile on mobile, desktop on desktop */
        @media (max-width: 767px) {
          .floating-cta-mobile {
            display: flex;
          }
          .floating-cta-desktop {
            display: none !important;
          }
        }

        @media (min-width: 768px) {
          .floating-cta-mobile {
            display: none !important;
          }
          .floating-cta-desktop {
            display: block;
          }
        }
      `}</style>
    </>
  );
}

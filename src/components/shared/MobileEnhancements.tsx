"use client";
import React, { useEffect, useState } from "react";

/**
 * MobileEnhancements - Adds mobile-specific interactions
 * - Scroll direction detection
 * - Pull-to-refresh indicator
 * - Touch-friendly interactions
 * - Vibration feedback on important actions
 */
export default function MobileEnhancements() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < 5) {
        ticking = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? "down" : "up");
      setLastScrollY(scrollY > 0 ? scrollY : 0);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // Add haptic feedback for mobile devices
  const vibrateOnAction = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10); // Short vibration
    }
  };

  useEffect(() => {
    // Add vibration to all CTA buttons
    const ctaButtons = document.querySelectorAll<HTMLElement>(
      'a[href^="tel:"], .theme-btn, .cta-call, .cta-book'
    );

    ctaButtons.forEach((button) => {
      button.addEventListener('touchstart', vibrateOnAction, { passive: true });
    });

    return () => {
      ctaButtons.forEach((button) => {
        button.removeEventListener('touchstart', vibrateOnAction);
      });
    };
  }, []);

  // Optimize touch events - prevent 300ms delay
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes';
    
    const existingMeta = document.querySelector('meta[name="viewport"]');
    if (existingMeta) {
      existingMeta.remove();
    }
    document.head.appendChild(meta);

    // Add touch-action CSS
    document.body.style.touchAction = 'manipulation';

    return () => {
      document.body.style.touchAction = '';
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #ff5722, #e64a19)',
          zIndex: 9999,
          transition: 'width 0.1s ease-out',
          width: `${(window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
        }}
      />

      <style jsx global>{`
        /* Improve touch interactions on mobile */
        * {
          -webkit-tap-highlight-color: rgba(255, 87, 34, 0.1);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Improve button touch targets */
        button,
        a,
        input,
        select,
        textarea {
          min-height: 44px;
          min-width: 44px;
        }

        /* Prevent text selection on buttons */
        button,
        .theme-btn,
        .cta-call,
        .cta-book {
          -webkit-user-select: none;
          user-select: none;
        }

        /* Improve form inputs on mobile */
        input,
        textarea,
        select {
          font-size: 16px !important; /* Prevents zoom on iOS */
        }

        /* Optimize animations for mobile */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Add loading state for images */
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }

        /* Prevent horizontal scroll */
        body {
          overflow-x: hidden;
        }

        /* Improve text readability on mobile */
        @media (max-width: 767px) {
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }

          h1, h2, h3, h4, h5, h6 {
            text-wrap: balance;
            overflow-wrap: break-word;
            hyphens: auto;
          }

          p, li, span {
            overflow-wrap: break-word;
            word-wrap: break-word;
          }
        }

        /* Active states for touch */
        button:active,
        a:active,
        .theme-btn:active {
          transform: scale(0.97);
          opacity: 0.9;
        }

        /* Fix sticky positioning on iOS */
        .floating-cta-mobile,
        .floating-cta-desktop {
          position: -webkit-sticky;
          position: sticky;
        }

        /* Improve scroll performance */
        .service-summary-card,
        .faq-item,
        .trust-badge-item {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Add safe area padding for notched devices */
        @supports (padding: env(safe-area-inset-bottom)) {
          .floating-cta-mobile {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </>
  );
}

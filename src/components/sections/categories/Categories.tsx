'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';
import './Categories.css';

const Categories: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-header">
          <h2 className="categories-title">Category</h2>
          <p className="categories-subtitle">
            Accessories for your <br></br> mobile device
          </p>
        </div>

        <div className="categories-carousel-wrapper">
          {/* Left Arrow */}
          <button 
            className="carousel-arrow carousel-arrow-left"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Categories Container */}
          <div 
            className="categories-carousel"
            ref={scrollContainerRef}
          >
            {categories.map((category, index) => (
              <Link 
                href={category.link} 
                key={index}
                className="category-card"
              >
                <div className="category-image-wrapper">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={150}
                    className="category-image"
                    priority={index < 3} // Prioritize first 3 images
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" fill="%23f1f5f9"><rect width="200" height="150" fill="%23e2e8f0"/><text x="100" y="75" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="14" fill="%2364748b">${category.name}</text></svg>`;
                    }}
                  />
                  <div className="category-overlay">
                    <span className="category-cta">Shop Now</span>
                  </div>
                </div>
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          {/* Right Arrow */}
          <button 
            className="carousel-arrow carousel-arrow-right"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        {/* Mobile Swipe Hint */}
        <div className="mobile-hint">
          <span>← Swipe to explore categories →</span>
        </div>
      </div>
    </section>
  );
};

export default Categories;

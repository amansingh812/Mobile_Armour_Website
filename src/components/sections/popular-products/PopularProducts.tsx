'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { popularProducts } from '@/data/popular-products';
import './PopularProducts.css';
import SectionTitle from '@/components/shared/section/section-title';

const PopularProducts: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="popular-products-section">
      <div className="popular-products-container">
        <div className="popular-products-header">
          < SectionTitle
              title="Popular Products"
              subTitle="Discover our best-selling accessories"
            />
        </div>
        <div className="popular-products-carousel">
          <button 
            className="carousel-btn carousel-btn-left" 
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="popular-products-scroll" ref={scrollContainerRef}>
            {popularProducts.map((product) => {
              const current = typeof product.newPrice === 'number' && product.newPrice > 0 
                ? product.newPrice 
                : product.price;
              const old = typeof product.oldPrice === 'number' ? product.oldPrice : undefined;
              const hasDiscount = typeof old === 'number' && old > 0 && old > current;
              const discountPercent = hasDiscount ? Math.round(((old - current) / old) * 100) : 0;

              return (
                <div key={product._id} className="popular-product-card">
                  <div className="popular-product-image-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="popular-product-image"
                    />
                    {/* {hasDiscount && (
                      <span className="popular-sale-badge">sale</span>
                    )} */}
                    <span className="popular-category-badge">{product.category}</span>
                  </div>

                  <div className="popular-product-info">
                    <h3 className="popular-product-name" title={product.name}>
                      {product.name}
                    </h3>
                    <p className="popular-product-description">
                      {product.description}
                    </p>
                    
                    {product.features && product.features.length > 0 && (
                      <div className="popular-product-features">
                        {product.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="feature-tag">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="popular-product-footer">
                      <div className="popular-product-price">
                        <span className="popular-current-price">${current}</span>
                        {hasDiscount && (
                          <span className="popular-old-price">${old}</span>
                        )}
                      </div>
                      <Link href={`/products/${product._id}`} className="popular-view-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            className="carousel-btn carousel-btn-right" 
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="popular-products-view-all">
          <Link href="/products" className="view-all-btn">
            View All Products
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;

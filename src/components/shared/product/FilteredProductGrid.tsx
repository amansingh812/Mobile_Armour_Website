'use client';

import React, { useRef } from 'react';
import useSWR from 'swr';
import ProductCard, { DBProduct } from './ProductCard';
import './ProductGrid.css';

interface FilteredProductGridProps {
  category?: string;
  filters?: Record<string, string[]>;
}

const FilteredProductGrid: React.FC<FilteredProductGridProps> = ({ category, filters = {} }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };
  
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  
  // Build the API URL with filters
  const buildApiUrl = () => {
    const params = new URLSearchParams();
    
    // Add category filter if provided
    if (category) {
      params.set('category', category);
    }
    
    // Add advanced filters
    Object.entries(filters).forEach(([filterType, values]) => {
      if (values.length > 0) {
        params.set(filterType, values.join(','));
      }
    });
    
    return `/api/products${params.toString() ? `?${params.toString()}` : ''}`;
  };
  
  const apiUrl = buildApiUrl();
  
  // Debug logging
  console.log('FilteredProductGrid - category:', category);
  console.log('FilteredProductGrid - filters:', filters);
  console.log('FilteredProductGrid - apiUrl:', apiUrl);
  
  const { data, error } = useSWR<DBProduct[]>(apiUrl, fetcher, { revalidateOnFocus: false });

  if (error) return <div className="error-message">Failed to load products</div>;
  if (!data) return <div className="loading-message">Loading products...</div>;
  if (data.length === 0) {
    return (
      <div className="no-products-message">
        <p>No products found{category ? ` in ${category} category` : ''}.</p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid" ref={scrollContainerRef}>
        {data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="product-scroll-controls">
        <button onClick={scrollLeft} className="carousel-arrow" aria-label="Scroll left">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button onClick={scrollRight} className="carousel-arrow" aria-label="Scroll right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FilteredProductGrid;

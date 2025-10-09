'use client';

import React from 'react';
import useSWR from 'swr';
import ProductCard, { DBProduct } from './ProductCard';
import './ProductGrid.css';

interface FilteredProductGridProps {
  category?: string;
}

const FilteredProductGrid: React.FC<FilteredProductGridProps> = ({ category }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  
  // Build the API URL with category filter if provided
  const apiUrl = category ? `/api/products?category=${encodeURIComponent(category)}` : '/api/products';
  
  // Debug logging
  console.log('FilteredProductGrid - category:', category);
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
    <div className="product-grid">
      {data.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default FilteredProductGrid;

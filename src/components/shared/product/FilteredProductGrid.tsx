'use client';

import React from 'react';
import useSWR from 'swr';
import { DBProduct } from './ProductCard';
import ProductTile from '@/components/store/ProductTile';
import type { ShopProduct } from '@/lib/shop-data';
import '@/components/store/store.css';
import './ProductGrid.css';

interface FilteredProductGridProps {
  category?: string;
  query?: string;
  filters?: Record<string, string[]>;
}

const FilteredProductGrid: React.FC<FilteredProductGridProps> = ({ category, query, filters = {} }) => {
  
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  
  // Build the API URL with filters
  const buildApiUrl = () => {
    const params = new URLSearchParams();
    
    // Add category filter if provided
    if (category) {
      params.set('category', category);
    }
    if (query) {
      params.set('q', query);
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
  
  
  const { data, error } = useSWR<DBProduct[]>(apiUrl, fetcher, { revalidateOnFocus: false });

  if (error) return <div className="error-message">Failed to load products</div>;
  if (!data) return <div className="loading-message">Loading products...</div>;
  if (data.length === 0) {
    return (
      <div className="no-products-message">
        <p>No products found{query ? ` for "${query}"` : category ? ` in ${category} category` : ''}.</p>
      </div>
    );
  }

  return (
    <div className="ma-pgrid">
      {data.map((product, i) => (
        <ProductTile key={product._id} product={product as unknown as ShopProduct} priority={i < 4} />
      ))}
    </div>
  );
};

export default FilteredProductGrid;

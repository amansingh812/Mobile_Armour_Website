'use client';

import React from 'react';
import useSWR from 'swr';
import ProductCard, { DBProduct } from './ProductCard';
import './ProductGrid.css';

const ProductGrid: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<DBProduct[]>('/api/products', fetcher, { revalidateOnFocus: false });

  if (error) return <div>Failed to load products</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="product-grid">
      {data.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

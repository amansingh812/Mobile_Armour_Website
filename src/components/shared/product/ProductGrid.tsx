'use client';

import React from 'react';
import ProductCard from './ProductCard';   
import './ProductGrid.css';
import { products } from '@/data/products';

const ProductGrid: React.FC = () => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

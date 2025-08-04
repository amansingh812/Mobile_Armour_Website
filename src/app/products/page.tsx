'use client';

import React from 'react';
import ProductGrid from '@/components/ProductGrid';
import './Products.css';

const ProductsPage = () => {
  return (
    <div className="products-page">
      <header className="products-header">
        <div className="container">
          <h1>Our Products</h1>
          <p className="products-subtitle">Discover our amazing collection of tech products</p>
        </div>
      </header>
      
      <main className="main-content">
        <div className="container">
          <ProductGrid />
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;

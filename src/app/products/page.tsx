'use client';

import React from 'react';
import ProductGrid from '@/components/shared/product/ProductGrid';
import './Products.css';

const ProductsPage = () => {
  return (
    <div className="products-page">
      <header className="product-Header section-title">
        <div className="container">
          <p className="products-title">Our All collection <span></span></p>

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

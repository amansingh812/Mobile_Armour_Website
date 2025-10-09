'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import FilteredProductGrid from '../../components/shared/product/FilteredProductGrid';
import CategoryFilter from '@/components/shared/product/CategoryFilter';
import './Products.css';

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  // Debug logging
  console.log('ProductsPage - selectedCategory:', selectedCategory);
  console.log('ProductsPage - searchParams:', searchParams.toString());

  return (
    <div className="products-page">
      <header className="product-Header section-title">
        <div className="container">
          <p className="products-title">Our All collection <span></span></p>
        </div>
      </header>
      <main className="main-content">
        <div className="container">
          <div className="products-layout">
            <aside className="filters-sidebar">
              <CategoryFilter selectedCategory={selectedCategory} />
            </aside>
            <div className="products-content">
              <FilteredProductGrid category={selectedCategory || undefined} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;

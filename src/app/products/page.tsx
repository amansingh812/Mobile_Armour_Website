'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilteredProductGrid from '../../components/shared/product/FilteredProductGrid';
import AdvancedProductFilter from '@/components/shared/product/AdvancedProductFilter';
import MobileFilterToggle from '@/components/shared/product/MobileFilterToggle';
import './Products.css';

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const searchQuery = searchParams.get('q') || '';
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const handleFiltersChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
  };

  return (
    <div className="products-page">
      <main className="main-content">
        <div className="container">
          {/* Mobile Filter Toggle */}
          <div className="mobile-filter-section">
            <MobileFilterToggle onFiltersChange={handleFiltersChange} />
          </div>
          
          {searchQuery && (
            <h2 className="products-search-title">Results for &ldquo;{searchQuery}&rdquo;</h2>
          )}
          <div className="products-layout">
            <aside className="filters-sidebar">
              <AdvancedProductFilter onFiltersChange={handleFiltersChange} />
            </aside>
            <div className="products-content">
              <FilteredProductGrid 
                category={selectedCategory || undefined}
                query={searchQuery || undefined}
                filters={activeFilters}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Suspense is required because this page reads useSearchParams(). (The global
// app/loading.tsx used to provide it, but that made every page stream with a 200
// status, so 404s and redirects reached Google as "200 OK".)
export default function ProductsPageWithSuspense() {
  return (
    <>
      {/* Outside Suspense so the heading is in the server HTML. */}
      <div className="container">
        <h1 className="products-search-title">Phone cases, screen protectors &amp; chargers</h1>
      </div>
      <Suspense fallback={<div className="flex items-center justify-center roofix-loader"><span className="loader"></span></div>}>
        <ProductsPage />
      </Suspense>
    </>
  );
}

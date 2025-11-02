'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilteredProductGrid from '../../components/shared/product/FilteredProductGrid';
import AdvancedProductFilter from '@/components/shared/product/AdvancedProductFilter';
import MobileFilterToggle from '@/components/shared/product/MobileFilterToggle';
import './Products.css';

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  // Debug logging
  console.log('ProductsPage - selectedCategory:', selectedCategory);
  console.log('ProductsPage - searchParams:', searchParams.toString());
  console.log('ProductsPage - activeFilters:', activeFilters);

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
          
          <div className="products-layout">
            <aside className="filters-sidebar">
              <AdvancedProductFilter onFiltersChange={handleFiltersChange} />
            </aside>
            <div className="products-content">
              <FilteredProductGrid 
                category={selectedCategory || undefined} 
                filters={activeFilters}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;

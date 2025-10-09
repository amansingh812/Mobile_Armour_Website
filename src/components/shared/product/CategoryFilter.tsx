'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/data/categories';
import './CategoryFilter.css';

interface CategoryFilterProps {
  selectedCategory: string | null;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categoryName: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categoryName) {
      params.set('category', categoryName);
    } else {
      params.delete('category');
    }
    
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="category-filter">
      <div className="filter-header">
        <h3>Filter by Category</h3>
      </div>
      <div className="filter-options">
        <button
          className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
          onClick={() => handleCategoryChange(null)}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.name}
            className={`filter-btn ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

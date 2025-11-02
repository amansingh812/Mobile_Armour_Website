'use client';

import React, { useState } from 'react';
import AdvancedProductFilter from './AdvancedProductFilter';
import './MobileFilterToggle.css';

interface MobileFilterToggleProps {
  onFiltersChange?: (filters: Record<string, string[]>) => void;
}

const MobileFilterToggle: React.FC<MobileFilterToggleProps> = ({ onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mobile-filter-toggle">
      <button 
        className="filter-toggle-btn"
        onClick={toggleFilters}
        aria-expanded={isOpen}
        aria-controls="mobile-filters"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M2.5 5H17.5M5 10H15M7.5 15H12.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Filters
        <span className={`chevron ${isOpen ? 'open' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div 
          id="mobile-filters" 
          className="mobile-filters-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="mobile-filters-content">
            <div className="mobile-filters-header">
              <h3>Filters</h3>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close filters"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="mobile-filters-body">
              <AdvancedProductFilter onFiltersChange={onFiltersChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilterToggle;

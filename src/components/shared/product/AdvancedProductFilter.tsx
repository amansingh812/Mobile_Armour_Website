'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { ALL_FILTER_OPTIONS } from '@/data/filterOptions';
import './AdvancedProductFilter.css';

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  isExpanded?: boolean;
}

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface AdvancedProductFilterProps {
  onFiltersChange?: (filters: Record<string, string[]>) => void;
}

const AdvancedProductFilter: React.FC<AdvancedProductFilterProps> = ({ onFiltersChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    device: true,
    cases: true,
    brand: false,
    accessory: false,
    chargers: false,
    mounts: false,
    cables: false,
    screenProtectors: false,
  });

  // Fetch dynamic filter counts
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: filterCounts } = useSWR('/api/products/filter-counts', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000, // Refresh every minute
  });

  // Generate filter sections with dynamic counts
  const filterSections: FilterSection[] = Object.entries(ALL_FILTER_OPTIONS).map(([sectionId, options]) => {
    const sectionTitles: Record<string, string> = {
      device: 'Device',
      cases: 'Cases',
      brand: 'Brand',
      accessory: 'Accessory Type',
      chargers: 'Chargers & Power',
      mounts: 'Mounts',
      cables: 'Cables',
      screenProtectors: 'Screen Protectors',
    };

    return {
      id: sectionId,
      title: sectionTitles[sectionId] || sectionId,
      options: options.map(option => ({
        id: option.id,
        label: option.label,
        count: filterCounts?.[sectionId]?.[option.id] || 0
      }))
    };
  });

  // Initialize filters from URL params
  useEffect(() => {
    const filters: Record<string, string[]> = {};
    filterSections.forEach(section => {
      const paramValue = searchParams.get(section.id);
      if (paramValue) {
        filters[section.id] = paramValue.split(',');
      }
    });
    setSelectedFilters(filters);
  }, [searchParams]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleFilterChange = (sectionId: string, optionId: string, checked: boolean) => {
    const newFilters = { ...selectedFilters };
    
    if (!newFilters[sectionId]) {
      newFilters[sectionId] = [];
    }

    if (checked) {
      if (!newFilters[sectionId].includes(optionId)) {
        newFilters[sectionId] = [...newFilters[sectionId], optionId];
      }
    } else {
      newFilters[sectionId] = newFilters[sectionId].filter(id => id !== optionId);
      if (newFilters[sectionId].length === 0) {
        delete newFilters[sectionId];
      }
    }

    setSelectedFilters(newFilters);
    updateURL(newFilters);
    onFiltersChange?.(newFilters);
  };

  const updateURL = (filters: Record<string, string[]>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Clear existing filter params
    filterSections.forEach(section => {
      params.delete(section.id);
    });

    // Add new filter params
    Object.entries(filters).forEach(([sectionId, values]) => {
      if (values.length > 0) {
        params.set(sectionId, values.join(','));
      }
    });

    const newUrl = `/products?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    const params = new URLSearchParams(searchParams.toString());
    filterSections.forEach(section => {
      params.delete(section.id);
    });
    router.push(`/products?${params.toString()}`, { scroll: false });
    onFiltersChange?.({});
  };

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0);
  };

  return (
    <div className="advanced-product-filter">
      <div className="filter-header">
        <div className="filter-title">
          <h3>Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="active-count">{getActiveFiltersCount()}</span>
          )}
        </div>
        {getActiveFiltersCount() > 0 && (
          <button className="clear-all-btn" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className="filter-sections">
        {filterSections.map((section) => (
          <div key={section.id} className="filter-section">
            <button
              className="section-header"
              onClick={() => toggleSection(section.id)}
            >
              <span className="section-title">{section.title}</span>
              <span className={`expand-icon ${expandedSections[section.id] ? 'expanded' : ''}`}>
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

            {expandedSections[section.id] && (
              <div className="section-content">
                <div className="filter-options">
                  {section.options.map((option) => (
                    <label key={option.id} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedFilters[section.id]?.includes(option.id) || false}
                        onChange={(e) => handleFilterChange(section.id, option.id, e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{option.label}</span>
                      {option.count && (
                        <span className="option-count">({option.count})</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedProductFilter;

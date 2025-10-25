import React from 'react';
import { SearchFilters } from '../types/whiskey';
import { SearchFilters as SearchFiltersComponent } from './SearchFilters';

interface FiltersSectionProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  filters,
  onFiltersChange,
  showFilters,
  onToggleFilters
}) => {
  return (
    <div className="w-80">
      <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
        <SearchFiltersComponent filters={filters} onFiltersChange={onFiltersChange} />
      </div>
    </div>
  );
};
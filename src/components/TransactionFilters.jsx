import React from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function TransactionFilters({ filter, onFilterChange, searchTerm, onSearchChange }) {
  return (
    <div className="transaction-filters">
      <div className="transaction-filters__search">
        <Search size={16} className="transaction-filters__search-icon" />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search transactions..."
          className="transaction-filters__input"
        />
      </div>
      
      <div className="transaction-filters__select-wrap">
        <select 
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="transaction-filters__select"
        >
          <option value="all">All Types</option>
          <option value="income">Income Only</option>
          <option value="expense">Expenses Only</option>
          <optgroup label="Categories">
            {CATEGORIES.map(c => (
              <option key={c} value={`category-${c}`}>
                {c}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    </div>
  );
}

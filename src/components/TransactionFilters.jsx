import React from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function TransactionFilters({ filter, onFilterChange, searchTerm, onSearchChange }) {
  return (
    <div className="p-3 sm:p-4 border-b border-[var(--border)] flex flex-col sm:flex-row gap-3 sm:gap-4 bg-[var(--bg-soft)] w-full">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-[var(--text-muted)]" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search transactions..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)]"
        />
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar w-full sm:w-auto">
        <select 
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)] min-w-[120px]"
        >
          <option value="all">All Types</option>
          <option value="income">Income Only</option>
          <option value="expense">Expenses Only</option>
          <optgroup label="Categories">
            {CATEGORIES.map(c => (
              <option key={c} value={`category-${c}`}>{c}</option>
            ))}
          </optgroup>
        </select>
      </div>
    </div>
  );
}

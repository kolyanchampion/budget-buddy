import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { normalizeCurrencyCode } from '../utils/currency';

export default function TransactionForm({ onAdd, settings }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');

  const baseCurrency = normalizeCurrencyCode(settings?.baseCurrency);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Please enter a transaction name');
      return;
    }

    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid positive amount');
      return;
    }

    if (!formData.date) {
      setError('Please select a date');
      return;
    }

    onAdd({
      ...formData,
      amount_base: parseFloat(formData.amount),
      base_currency: baseCurrency
    });

    setFormData(prev => ({
      ...prev,
      title: '',
      amount: '',
      category: prev.type === 'income' ? 'Income' : 'Food'
    }));
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type,
      category: type === 'income' ? 'Income' : 'Food'
    }));
  };

  return (
    <div className="glass-card p-5 sm:p-6 h-full border-t-4 border-t-[var(--primary)] bg-[var(--surface)] w-full">
      <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] mb-6 font-heading">Add Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex bg-[var(--bg-soft)] p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => handleTypeChange('expense')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              formData.type === 'expense' 
                ? 'bg-[var(--surface)] text-[var(--expense)] shadow-sm' 
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('income')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              formData.type === 'income' 
                ? 'bg-[var(--surface)] text-[var(--income)] shadow-sm' 
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            Income
          </button>
        </div>

        {error && (
          <div className="bg-[var(--expense)]/10 text-[var(--expense)] p-3 rounded-lg text-sm mb-4 font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--expense)]"></span>
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs sm:text-sm font-medium text-[var(--text-muted)] mb-1">Transaction Name</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-2 sm:py-2.5 text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all bg-[var(--input-bg)] text-[var(--input-text)]"
            placeholder="e.g. Lunch with friends"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[var(--text-muted)] mb-1">Amount ({baseCurrency})</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full px-4 py-2 sm:py-2.5 text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all bg-[var(--input-bg)] text-[var(--input-text)]"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[var(--text-muted)] mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-2 sm:py-2.5 text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all bg-[var(--input-bg)] text-[var(--input-text)]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-[var(--text-muted)] mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-4 py-2 sm:py-2.5 text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all bg-[var(--input-bg)] text-[var(--input-text)]"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c} disabled={formData.type === 'income' && c !== 'Income' && c !== 'Other'}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md shadow-[var(--primary)]/20 flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Add {formData.type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
}

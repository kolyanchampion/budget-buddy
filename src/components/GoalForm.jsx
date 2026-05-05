import React, { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import { normalizeCurrencyCode } from '../utils/currency';

export default function GoalForm({ onAdd, settings }) {
  const [formData, setFormData] = useState({
    title: '',
    target: '',
    saved: ''
  });
  const [error, setError] = useState('');

  const baseCurrency = normalizeCurrencyCode(settings?.baseCurrency);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Please enter a goal name');
      return;
    }

    if (!formData.target || isNaN(formData.target) || parseFloat(formData.target) <= 0) {
      setError('Please enter a valid target amount');
      return;
    }

    const savedAmount = formData.saved ? parseFloat(formData.saved) : 0;
    
    if (savedAmount < 0) {
      setError('Saved amount cannot be negative');
      return;
    }

    onAdd({
      title: formData.title,
      target_amount_base: parseFloat(formData.target),
      saved_amount_base: savedAmount,
      base_currency: baseCurrency
    });

    setFormData({ title: '', target: '', saved: '' });
  };

  return (
    <div className="glass-card p-5 sm:p-6 h-full flex flex-col justify-center border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)]/50 transition-colors bg-[var(--bg-soft)]/50 group w-full">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-[var(--surface)] rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
          <Target className="text-[var(--primary)]" size={24} />
        </div>
        <h3 className="font-bold text-[var(--text)] text-base sm:text-lg">Create New Goal</h3>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">Set a target and track your savings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {error && (
          <div className="text-[var(--expense)] text-xs text-center font-medium bg-[var(--expense)]/10 py-1.5 rounded-md">
            {error}
          </div>
        )}
        
        <div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)]"
            placeholder="Goal name (e.g. New Macbook)"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs sm:text-sm">{baseCurrency}</span>
            <input
              type="number"
              step="0.01"
              value={formData.target}
              onChange={(e) => setFormData({...formData, target: e.target.value})}
              className="w-full pl-10 sm:pl-12 pr-2 sm:pr-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)]"
              placeholder="Target"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs sm:text-sm">{baseCurrency}</span>
            <input
              type="number"
              step="0.01"
              value={formData.saved}
              onChange={(e) => setFormData({...formData, saved: e.target.value})}
              className="w-full pl-10 sm:pl-12 pr-2 sm:pr-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)]"
              placeholder="Already saved"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 sm:py-2.5 bg-[var(--text)] hover:bg-[var(--primary)] text-[var(--bg)] rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 mt-2"
        >
          <Plus size={16} /> Add Goal
        </button>
      </form>
    </div>
  );
}

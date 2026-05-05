import React, { useState } from 'react';
import { Target, TrendingUp, Plus, Minus } from 'lucide-react';
import { convertAmount, formatMoney, normalizeCurrencyCode } from '../utils/currency';

export default function GoalCard({ goal, onUpdate, onDelete, settings, rates }) {
  const [isAdding, setIsAdding] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [error, setError] = useState('');

  const displayCurrency = normalizeCurrencyCode(settings?.displayCurrency);
  const goalBaseCurrency = goal.base_currency;

  const targetAmountDisplay = convertAmount(goal.target_amount_base, goalBaseCurrency, displayCurrency, rates);
  const savedAmountDisplay = convertAmount(goal.saved_amount_base, goalBaseCurrency, displayCurrency, rates);
  
  const progress = goal.target_amount_base > 0 
    ? Math.min(100, Math.round((goal.saved_amount_base / goal.target_amount_base) * 100))
    : 0;
  const isCompleted = progress >= 100;
  const isDifferentCurrency = goalBaseCurrency !== displayCurrency;

  const handleAddFunds = (e) => {
    e.preventDefault();
    setError('');
    
    const amount = parseFloat(addAmount);
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Enter a valid amount');
      return;
    }

    const newSavedBase = goal.saved_amount_base + amount;
    onUpdate(goal.id, { saved_amount_base: newSavedBase });
    setAddAmount('');
    setIsAdding(false);
  };

  return (
    <div className={`glass-card p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden transition-all w-full ${
      isCompleted ? 'ring-2 ring-[var(--primary)] shadow-lg shadow-[var(--primary)]/20' : ''
    }`}>
      {isCompleted && (
        <div className="absolute top-0 right-0 bg-[var(--primary)] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-bl-xl">
          Completed
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 sm:p-3 rounded-xl ${isCompleted ? 'bg-[var(--primary)] text-white' : 'bg-[var(--primary)]/10 text-[var(--primary)]'}`}>
            <Target size={20} />
          </div>
          <div className="truncate pr-2">
            <h3 className="font-bold text-[var(--text)] text-base sm:text-lg truncate">{goal.title}</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] flex items-center gap-1 truncate">
              <TrendingUp size={14} className="flex-shrink-0" /> Goal: {formatMoney(targetAmountDisplay, displayCurrency)}
            </p>
          </div>
        </div>
        <button 
          onClick={() => onDelete(goal.id)}
          className="text-[var(--border)] hover:text-[var(--expense)] transition-colors p-1"
          aria-label="Delete Goal"
        >
          <Minus size={16} />
        </button>
      </div>

      <div>
        <div className="flex justify-between items-end mb-2">
          <div className="truncate pr-2">
            <span className="text-xl sm:text-2xl font-bold text-[var(--text)] font-heading">{formatMoney(savedAmountDisplay, displayCurrency)}</span>
            <span className="text-xs sm:text-sm text-[var(--text-muted)] ml-1">saved</span>
          </div>
          <span className="font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-lg text-xs sm:text-sm flex-shrink-0">
            {progress}%
          </span>
        </div>
        
        <div className="w-full bg-[var(--bg-soft)] rounded-full h-3 mb-4 sm:mb-6 relative overflow-hidden">
          <div 
            className={`h-3 rounded-full transition-all duration-1000 ${isCompleted ? 'bg-[var(--primary)]' : 'bg-[var(--primary)] opacity-80'}`}
            style={{ width: `${progress}%` }}
          >
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>

        {isDifferentCurrency && (
          <p className="text-[10px] text-[var(--text-muted)] text-center mb-2">
            Base: {formatMoney(goal.saved_amount_base, goalBaseCurrency)} / {formatMoney(goal.target_amount_base, goalBaseCurrency)}
          </p>
        )}

        {!isAdding ? (
          <button 
            onClick={() => setIsAdding(true)}
            disabled={isCompleted}
            className={`w-full py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 ${
              isCompleted 
                ? 'bg-[var(--surface-elevated)] text-[var(--text-muted)] cursor-not-allowed' 
                : 'bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)]'
            }`}
          >
            <Plus size={16} /> Add Funds
          </button>
        ) : (
          <form onSubmit={handleAddFunds} className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs sm:text-sm">{goalBaseCurrency}</span>
              <input
                type="number"
                step="0.01"
                autoFocus
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                className="w-full pl-10 pr-2 sm:pr-3 py-2 text-xs sm:text-sm border border-[var(--primary)]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)]"
                placeholder="Amount"
              />
              {error && <p className="absolute -bottom-5 left-0 text-[10px] text-[var(--expense)]">{error}</p>}
            </div>
            <button 
              type="submit"
              className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-2 sm:px-3 rounded-xl transition-colors font-medium text-xs sm:text-sm"
            >
              Add
            </button>
            <button 
              type="button"
              onClick={() => { setIsAdding(false); setError(''); }}
              className="bg-[var(--surface-elevated)] hover:bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)] px-2 sm:px-3 rounded-xl transition-colors text-xs sm:text-sm"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

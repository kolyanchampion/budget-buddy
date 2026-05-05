import React, { useState } from 'react';
import { DollarSign, Coffee, ShoppingBag, Bus, Film, PiggyBank, Book, MoreHorizontal } from 'lucide-react';
import TransactionFilters from './TransactionFilters';
import EmptyState from './EmptyState';
import { convertAmount, formatMoney, normalizeCurrencyCode } from '../utils/currency';

const categoryIcons = {
  Food: <Coffee size={20} />,
  Shopping: <ShoppingBag size={20} />,
  Transport: <Bus size={20} />,
  Entertainment: <Film size={20} />,
  Income: <DollarSign size={20} />,
  Savings: <PiggyBank size={20} />,
  Education: <Book size={20} />,
  Other: <MoreHorizontal size={20} />
};

export default function TransactionList({ transactions, onDelete, settings, rates }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const displayCurrency = normalizeCurrencyCode(settings?.displayCurrency);

  const filteredTransactions = transactions
    .filter(t => {
      if (filter === 'income') return t.type === 'income';
      if (filter === 'expense') return t.type === 'expense';
      if (filter.startsWith('category-')) return t.category === filter.replace('category-', '');
      return true;
    })
    .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="glass-card overflow-hidden h-full flex flex-col w-full">
      <div className="p-4 sm:p-6 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface)]">
        <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] font-heading">Recent Transactions</h2>
        <span className="bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
          {transactions.length} Total
        </span>
      </div>
      
      <TransactionFilters 
        filter={filter} 
        onFilterChange={setFilter} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <div className="divide-y divide-[var(--border)] flex-1 overflow-auto max-h-[400px] sm:max-h-[500px]">
        {filteredTransactions.length === 0 ? (
          <div className="py-12">
            <EmptyState 
              icon={<DollarSign size={32} />}
              title="No transactions found"
              description={transactions.length === 0 ? "Add your first income or expense to start tracking." : "Try adjusting your search or filters."}
            />
          </div>
        ) : (
          filteredTransactions.map((t) => {
            const convertedAmount = convertAmount(t.amount_base, t.base_currency, displayCurrency, rates);
            const isDifferentCurrency = t.base_currency !== displayCurrency;

            return (
              <div key={t.id} className="p-4 sm:p-6 flex flex-wrap sm:flex-nowrap items-center justify-between hover:bg-[var(--bg-soft)] transition-colors group gap-2 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-[200px]">
                  <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex-shrink-0 ${
                    t.type === 'income' ? 'bg-[var(--income)]/10 text-[var(--income)]' : 
                    t.category === 'Food' ? 'bg-[#f97316]/10 text-[#f97316]' :
                    t.category === 'Transport' ? 'bg-[#3b82f6]/10 text-[#3b82f6]' :
                    t.category === 'Entertainment' ? 'bg-[#a855f7]/10 text-[#a855f7]' :
                    'bg-[var(--surface-elevated)] text-[var(--text-muted)]'
                  }`}>
                    {categoryIcons[t.category] || categoryIcons['Other']}
                  </div>
                  
                  <div className="truncate pr-2">
                    <h4 className="font-semibold text-sm sm:text-base text-[var(--text)] group-hover:text-[var(--primary)] transition-colors truncate">{t.title}</h4>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-[var(--text-muted)] mt-0.5 sm:mt-1">
                      <span className="bg-[var(--surface-elevated)] px-1.5 sm:px-2 py-0.5 rounded-md truncate max-w-[80px] sm:max-w-none">{t.category}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="truncate">{new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 justify-end flex-shrink-0">
                  <div className="text-right">
                    <div className={`text-sm sm:text-base font-bold whitespace-nowrap ${t.type === 'income' ? 'text-[var(--income)]' : 'text-[var(--text)]'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatMoney(convertedAmount, displayCurrency)}
                    </div>
                    {isDifferentCurrency && (
                      <div className="text-[10px] text-[var(--text-muted)]">
                        Orig: {formatMoney(t.amount_base, t.base_currency)}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => onDelete(t.id)}
                    className="text-[var(--border)] hover:text-[var(--expense)] transition-colors p-1 sm:p-2"
                    aria-label="Delete transaction"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

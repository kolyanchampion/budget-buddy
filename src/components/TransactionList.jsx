import React, { useState } from 'react';
import { DollarSign, Coffee, ShoppingBag, Bus, Film, PiggyBank, Book, MoreHorizontal, Trash2 } from 'lucide-react';
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

function getTransactionAccent(transaction) {
  if (transaction.type === 'income') return 'income';
  if (transaction.category === 'Food') return 'food';
  if (transaction.category === 'Transport') return 'transport';
  if (transaction.category === 'Entertainment') return 'entertainment';
  return 'default';
}

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
    <section className="transaction-list-card glass-card">
      <header className="transaction-list-card__header">
        <div>
          <h2 className="transaction-list-card__title">Recent Transactions</h2>
        </div>

        <span className="transaction-list-card__badge">
          {transactions.length} Total
        </span>
      </header>
      
      <TransactionFilters 
        filter={filter} 
        onFilterChange={setFilter} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <div className="transaction-list-card__body custom-scrollbar">
        {filteredTransactions.length === 0 ? (
          <div className="empty-transactions-state">
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
            const accent = getTransactionAccent(t);

            return (
              <article key={t.id} className="transaction-row">
                <div className="transaction-row__main">
                  <div className={`transaction-row__icon transaction-row__icon--${accent}`}>
                    {categoryIcons[t.category] || categoryIcons.Other}
                  </div>
                  
                  <div className="transaction-row__content">
                    <h4 className="transaction-row__title">{t.title}</h4>

                    <div className="transaction-row__meta">
                      <span className="transaction-row__category">
                        {t.category}
                      </span>
                      <span className="transaction-row__dot">•</span>
                      <span>
                        {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="transaction-row__side">
                  <div className="transaction-row__amount-wrap">
                    <div className={`transaction-row__amount ${t.type === 'income' ? 'is-income' : 'is-expense'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatMoney(convertedAmount, displayCurrency)}
                    </div>

                    {isDifferentCurrency && (
                      <div className="transaction-row__original">
                        Orig: {formatMoney(t.amount_base, t.base_currency)}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => onDelete(t.id)}
                    className="transaction-row__delete"
                    aria-label="Delete transaction"
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

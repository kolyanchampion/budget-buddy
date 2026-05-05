import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { calculateAverageGoalsProgress } from '../utils/calculations';
import { convertAmount, formatMoney, normalizeCurrencyCode } from '../utils/currency';

export default function DashboardCards({ transactions, goals, settings, rates }) {
  const displayCurrency = normalizeCurrencyCode(settings?.displayCurrency);

  const calculateConvertedTotal = (txs) => {
    return txs.reduce((acc, t) => {
      const converted = convertAmount(t.amount_base, t.base_currency, displayCurrency, rates);
      return acc + converted;
    }, 0);
  };

  const incomeTxs = transactions.filter(t => t.type === 'income');
  const expenseTxs = transactions.filter(t => t.type === 'expense');

  const income = calculateConvertedTotal(incomeTxs);
  const expenses = calculateConvertedTotal(expenseTxs);
  const balance = income - expenses;
  const savingsProgress = calculateAverageGoalsProgress(goals);

  const budgetLimit = settings?.monthlyBudgetLimit ? parseFloat(settings.monthlyBudgetLimit) : null;
  const budgetBaseCurrency = normalizeCurrencyCode(settings?.baseCurrency);
  const budgetInDisplay = budgetLimit ? convertAmount(budgetLimit, budgetBaseCurrency, displayCurrency, rates) : null;
  
  const now = new Date();
  const thisMonthExpensesTxs = expenseTxs.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const thisMonthExpenses = calculateConvertedTotal(thisMonthExpensesTxs);
  const budgetUsagePercent = budgetInDisplay ? Math.min(100, Math.round((thisMonthExpenses / budgetInDisplay) * 100)) : 0;

  return (
    <section id="overview" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Balance Card */}
        <div className="glass-card p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/10 rounded-bl-full -z-10 group-hover:bg-[var(--primary)]/20 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Current Balance</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mt-1 font-heading">{formatMoney(balance, displayCurrency)}</h3>
            </div>
            <div className="bg-[var(--primary)]/10 p-2.5 sm:p-3 rounded-xl text-[var(--primary)] shadow-sm">
              <Wallet size={24} />
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            <span className="text-[var(--primary)] font-medium">Available</span>
          </p>
        </div>

        {/* Income Card */}
        <div className="glass-card p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--income)]/10 rounded-bl-full -z-10 group-hover:bg-[var(--income)]/20 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Total Income</p>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] mt-1 font-heading">{formatMoney(income, displayCurrency)}</h3>
            </div>
            <div className="bg-[var(--income)]/10 p-2.5 sm:p-3 rounded-xl text-[var(--income)] shadow-sm">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)]">All time earnings</p>
        </div>

        {/* Expenses Card */}
        <div className="glass-card p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--expense)]/10 rounded-bl-full -z-10 group-hover:bg-[var(--expense)]/20 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Total Expenses</p>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] mt-1 font-heading">{formatMoney(expenses, displayCurrency)}</h3>
            </div>
            <div className="bg-[var(--expense)]/10 p-2.5 sm:p-3 rounded-xl text-[var(--expense)] shadow-sm">
              <TrendingDown size={24} />
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)]">All time spending</p>
        </div>

        {/* Savings Card */}
        <div className="glass-card p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#a855f7]/10 rounded-bl-full -z-10 group-hover:bg-[#a855f7]/20 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Goals Progress</p>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] mt-1 font-heading">{savingsProgress}%</h3>
            </div>
            <div className="bg-[#a855f7]/10 p-2.5 sm:p-3 rounded-xl text-[#a855f7] shadow-sm">
              <Target size={24} />
            </div>
          </div>
          <div>
            <div className="w-full bg-[var(--bg-soft)] rounded-full h-2">
              <div className="bg-[#a855f7] h-2 rounded-full transition-all duration-1000" style={{ width: `${savingsProgress}%` }}></div>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              {goals.length === 0 ? "No goals yet" : "Average across all goals"}
            </p>
          </div>
        </div>
      </div>

      {budgetInDisplay && (
        <div className="mt-6 bg-[var(--surface)] rounded-2xl p-4 sm:p-6 shadow-sm border border-[var(--border)]">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-[var(--text-muted)]">Monthly Budget Usage</span>
            <span className="font-bold text-[var(--text)]">{budgetUsagePercent}%</span>
          </div>
          <div className="w-full bg-[var(--bg-soft)] rounded-full h-3 mb-2">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${budgetUsagePercent >= 100 ? 'bg-[var(--expense)]' : 'bg-[var(--primary)]'}`}
              style={{ width: `${Math.min(100, budgetUsagePercent)}%` }}
            ></div>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Spent {formatMoney(thisMonthExpenses, displayCurrency)} of {formatMoney(budgetInDisplay, displayCurrency)} this month.
          </p>
        </div>
      )}
    </section>
  );
}

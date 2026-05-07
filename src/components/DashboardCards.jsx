import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { calculateAverageGoalsProgress } from '../utils/calculations';
import { convertAmount, formatMoney, normalizeCurrencyCode } from '../utils/currency';

function SummaryCard({ title, value, description, icon, accent = 'primary', children }) {
  return (
    <article className={`summary-card summary-card--${accent}`}>
      <div className="summary-card__glow" />

      <div className="summary-card__top">
        <div className="min-w-0">
          <p className="summary-card__label">{title}</p>
          <h3 className="summary-card__value">{value}</h3>
        </div>

        <div className="summary-card__icon">
          {icon}
        </div>
      </div>

      {children ? (
        children
      ) : (
        <p className="summary-card__description">{description}</p>
      )}
    </article>
  );
}

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
      <div className="summary-grid">
        <SummaryCard
          title="Current Balance"
          value={formatMoney(balance, displayCurrency)}
          description={<span className="summary-card__accent-text">Available</span>}
          icon={<Wallet size={24} />}
          accent="primary"
        />

        <SummaryCard
          title="Total Income"
          value={formatMoney(income, displayCurrency)}
          description="All time earnings"
          icon={<TrendingUp size={24} />}
          accent="income"
        />

        <SummaryCard
          title="Total Expenses"
          value={formatMoney(expenses, displayCurrency)}
          description="All time spending"
          icon={<TrendingDown size={24} />}
          accent="expense"
        />

        <SummaryCard
          title="Goals Progress"
          value={`${savingsProgress}%`}
          icon={<Target size={24} />}
          accent="goal"
        >
          <div className="summary-progress">
            <div className="summary-progress__track">
              <div 
                className="summary-progress__fill"
                style={{ width: `${savingsProgress}%` }}
              />
            </div>

            <p className="summary-card__description mt-2">
              {goals.length === 0 ? "No goals yet" : "Average across all goals"}
            </p>
          </div>
        </SummaryCard>
      </div>

      {budgetInDisplay && (
        <div className="budget-usage-card">
          <div className="flex justify-between text-sm mb-2">
            <span className="budget-usage-card__label">Monthly Budget Usage</span>
            <span className="budget-usage-card__percent">{budgetUsagePercent}%</span>          </div>

          <div className="budget-usage-card__track">
            <div 
              className={`budget-usage-card__fill ${budgetUsagePercent >= 100 ? 'is-over' : ''}`}
              style={{ width: `${Math.min(100, budgetUsagePercent)}%` }}
            />
          </div>

          <p className="budget-usage-card__description">            Spent {formatMoney(thisMonthExpenses, displayCurrency)} of {formatMoney(budgetInDisplay, displayCurrency)} this month.
          </p>
        </div>
      )}
    </section>
  );
}

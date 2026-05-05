import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Lightbulb, PieChart as PieChartIcon } from 'lucide-react';
import EmptyState from './EmptyState';
import { convertAmount, formatMoney, normalizeCurrencyCode } from '../utils/currency';

// Dynamic colors depending on theme is tricky in recharts, but we can use CSS custom properties via JS or hardcode
const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

export default function Insights({ transactions, settings, rates }) {
  const displayCurrency = normalizeCurrencyCode(settings?.displayCurrency);

  const expenseTxs = transactions.filter(t => t.type === 'expense');
  
  const categoryMap = expenseTxs.reduce((acc, t) => {
    const amount = convertAmount(t.amount_base, t.base_currency, displayCurrency, rates);
    if (!acc[t.category]) acc[t.category] = 0;
    acc[t.category] += amount;
    return acc;
  }, {});

  const data = Object.keys(categoryMap).map(name => ({
    name,
    value: categoryMap[name]
  })).filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const topCategory = data.length > 0 ? data[0] : null;

  return (
    <div className="glass-card p-5 sm:p-6 flex flex-col h-[400px] sm:h-[500px] w-full">
      <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] mb-6 font-heading">Spending Insights</h2>
      
      {data.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center py-8">
          <EmptyState 
            icon={<PieChartIcon size={32} />}
            title="No insights yet"
            description="Add a few expense transactions to see your spending patterns."
          />
        </div>
      ) : (
        <>
          <div className="flex-1 min-h-[200px] sm:min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={window.innerWidth < 640 ? 50 : 80}
                  outerRadius={window.innerWidth < 640 ? 80 : 120}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatMoney(value, displayCurrency)}
                  contentStyle={{ 
                    backgroundColor: 'var(--surface)', 
                    color: 'var(--text)',
                    borderRadius: '12px', 
                    border: '1px solid var(--border)', 
                    boxShadow: '0 4px 6px -1px var(--shadow)', 
                    fontWeight: 'bold' 
                  }}
                  itemStyle={{ color: 'var(--text)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--text)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {topCategory && (
            <div className="mt-4 sm:mt-6 bg-[var(--warning)]/10 border border-[var(--warning)]/20 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-3 items-start shadow-sm">
              <div className="text-[var(--warning)] mt-0.5 flex-shrink-0 hidden sm:block">
                <Lightbulb size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--warning)] text-xs sm:text-sm flex items-center gap-1">
                  <Lightbulb size={14} className="sm:hidden" /> Smart Tip
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                  You spent the most on <span className="font-bold text-[var(--text)]">{topCategory.name}</span> ({formatMoney(topCategory.value, displayCurrency)}). 
                  Consider setting a budget for this category to save more!
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

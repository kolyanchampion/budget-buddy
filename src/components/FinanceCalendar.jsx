import React, { useState } from 'react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  eachDayOfInterval, isSameMonth, isSameDay, isToday, startOfWeek, endOfWeek 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import EmptyState from './EmptyState';
import { convertAmount, formatMoney, normalizeCurrencyCode } from '../utils/currency';

export default function FinanceCalendar({ transactions, settings, rates }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const displayCurrency = normalizeCurrencyCode(settings?.displayCurrency);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "MMMM yyyy";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDayTransactions = (day) => {
    return transactions.filter(t => isSameDay(new Date(t.date), day));
  };

  const getDayTotals = (dayTransactions) => {
    return dayTransactions.reduce((acc, t) => {
      const converted = convertAmount(t.amount_base, t.base_currency, displayCurrency, rates);
      if (t.type === 'income') acc.income += converted;
      else acc.expense += converted;
      return acc;
    }, { income: 0, expense: 0 });
  };

  const selectedTransactions = getDayTransactions(selectedDate);

  return (
    <div className="glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-3 w-full">
      
      {/* Calendar View */}
      <div className="lg:col-span-2 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[var(--border)] overflow-x-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6 min-w-[280px]">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] font-heading">
            {format(currentDate, dateFormat)}
          </h2>
          <div className="flex gap-1 sm:gap-2">
            <button onClick={prevMonth} className="p-2 bg-[var(--surface-elevated)] hover:bg-[var(--bg-soft)] rounded-lg transition-colors text-[var(--text-muted)] hover:text-[var(--text)]">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextMonth} className="p-2 bg-[var(--surface-elevated)] hover:bg-[var(--bg-soft)] rounded-lg transition-colors text-[var(--text-muted)] hover:text-[var(--text)]">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-2 min-w-[280px]">
          {weekDays.map(day => (
            <div key={day} className="text-center font-bold text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider py-1 sm:py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 min-w-[280px]">
          {days.map((day, idx) => {
            const dayTxs = getDayTransactions(day);
            const { income, expense } = getDayTotals(dayTxs);
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isTodayDate = isToday(day);

            return (
              <div 
                key={idx}
                onClick={() => setSelectedDate(day)}
                className={`min-h-[60px] sm:min-h-[80px] p-1 sm:p-2 border rounded-lg sm:rounded-xl cursor-pointer transition-all flex flex-col ${
                  !isCurrentMonth ? 'opacity-30 bg-[var(--bg-soft)] border-transparent' : 
                  isSelected ? 'border-[var(--primary)] bg-[var(--primary)]/10 shadow-sm' : 
                  isTodayDate ? 'border-[var(--border)] bg-[var(--surface-elevated)]' : 
                  'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50'
                }`}
              >
                <span className={`text-xs sm:text-sm font-semibold mb-1 ${
                  isTodayDate ? 'text-[var(--primary)]' : 
                  isSelected ? 'text-[var(--primary-hover)]' : 'text-[var(--text)]'
                }`}>
                  {format(day, 'd')}
                </span>
                
                <div className="mt-auto space-y-0.5 sm:space-y-1 overflow-hidden">
                  {income > 0 && (
                    <div className="text-[9px] sm:text-[10px] font-bold text-[var(--income)] bg-[var(--income)]/10 px-1 py-0.5 rounded truncate">
                      +{formatMoney(income, displayCurrency)}
                    </div>
                  )}
                  {expense > 0 && (
                    <div className="text-[9px] sm:text-[10px] font-bold text-[var(--expense)] bg-[var(--expense)]/10 px-1 py-0.5 rounded truncate">
                      -{formatMoney(expense, displayCurrency)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Details View */}
      <div className="bg-[var(--bg-soft)] p-4 sm:p-6 flex flex-col w-full">
        <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-4 sm:mb-6 pb-4 border-b border-[var(--border)] flex items-center gap-2">
          <CalendarIcon size={20} className="text-[var(--primary)]" />
          <span className="truncate">{format(selectedDate, 'EEEE, MMM d')}</span>
        </h3>

        <div className="flex-1 overflow-y-auto custom-scrollbar max-h-[300px] sm:max-h-[400px]">
          {selectedTransactions.length === 0 ? (
            <div className="h-full flex items-center justify-center py-8 sm:py-12">
              <EmptyState 
                icon={<CalendarIcon size={24} />}
                title="No activity"
                description="No transactions on this day."
              />
            </div>
          ) : (
            <div className="space-y-3 pr-2">
              {selectedTransactions.map(t => {
                const converted = convertAmount(t.amount_base, t.base_currency, displayCurrency, rates);
                return (
                  <div key={t.id} className="bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)] shadow-sm flex flex-wrap justify-between items-center gap-2">
                    <div className="truncate flex-1 pr-2">
                      <p className="text-sm font-semibold text-[var(--text)] truncate">{t.title}</p>
                      <p className="text-xs text-[var(--text-muted)]">{t.category}</p>
                    </div>
                    <div className={`text-sm font-bold flex-shrink-0 ${t.type === 'income' ? 'text-[var(--income)]' : 'text-[var(--text)]'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatMoney(converted, displayCurrency)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

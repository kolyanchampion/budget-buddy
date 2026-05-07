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
  const formatCalendarAmount = (amount) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: displayCurrency,
        currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: 0
      }).format(amount);
    } catch {
      return formatMoney(amount, displayCurrency).replace(/([.,]00)/, '');
    }
  };

  return (
    <section className="finance-calendar-card glass-card">
      <div className="finance-calendar-card__main">
        <header className="calendar-header">
          <h2 className="calendar-title">
            {format(currentDate, dateFormat)}
          </h2>

          <div className="calendar-nav">
            <button 
              onClick={prevMonth} 
              className="calendar-nav-button"
              type="button"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>

            <button 
              onClick={nextMonth} 
              className="calendar-nav-button"
              type="button"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </header>

        <div className="calendar-weekdays">
          {weekDays.map(day => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {days.map((day, idx) => {
            const dayTxs = getDayTransactions(day);
            const { income, expense } = getDayTotals(dayTxs);
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isTodayDate = isToday(day);

            const dayClassName = [
              'calendar-day',
              !isCurrentMonth ? 'calendar-day--muted' : '',
              isSelected ? 'calendar-day--selected' : '',
              isTodayDate ? 'calendar-day--today' : '',
            ].filter(Boolean).join(' ');

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDate(day)}
                className={dayClassName}
              >
                <span className="calendar-day__number">
                  {format(day, 'd')}
                </span>
                
                <div className="calendar-day__totals">
                  {income > 0 && (
                    <span className="calendar-day__amount calendar-day__amount--income">
                      +{formatCalendarAmount(income)}
                    </span>
                  )}

                  {expense > 0 && (
                    <span className="calendar-day__amount calendar-day__amount--expense">
                      -{formatCalendarAmount(expense)}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="calendar-activity-panel">
        <header className="calendar-activity-panel__header">
          <CalendarIcon size={18} className="calendar-activity-panel__icon" />
          <h3 className="calendar-activity-panel__title">
            {format(selectedDate, 'EEEE, MMM d')}
          </h3>
        </header>

        <div className="calendar-activity-panel__body custom-scrollbar">
          {selectedTransactions.length === 0 ? (
            <div className="calendar-empty-state">
              <EmptyState 
                icon={<CalendarIcon size={24} />}
                title="No activity"
                description="No transactions on this day."
              />
            </div>
          ) : (
            <div className="calendar-activity-list">
              {selectedTransactions.map(t => {
                const converted = convertAmount(t.amount_base, t.base_currency, displayCurrency, rates);

                return (
                  <article key={t.id} className="calendar-activity-item">
                    <div className="calendar-activity-item__content">
                      <p className="calendar-activity-item__title">{t.title}</p>
                      <p className="calendar-activity-item__category">{t.category}</p>
                    </div>

                    <div className={`calendar-activity-item__amount ${t.type === 'income' ? 'is-income' : 'is-expense'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatMoney(converted, displayCurrency)}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}

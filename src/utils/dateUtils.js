import { format, isSameDay as fnsIsSameDay, getDaysInMonth, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'MMM d, yyyy');
};

export const isSameDay = (date1, date2) => {
  return fnsIsSameDay(new Date(date1), new Date(date2));
};

export const getMonthDays = (year, month) => {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(start);
  return eachDayOfInterval({ start, end });
};

export const groupTransactionsByDate = (transactions) => {
  const grouped = {};
  transactions.forEach((t) => {
    const dateStr = t.date.split('T')[0]; // Simple grouping by YYYY-MM-DD
    if (!grouped[dateStr]) grouped[dateStr] = [];
    grouped[dateStr].push(t);
  });
  return grouped;
};

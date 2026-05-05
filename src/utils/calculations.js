export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

export const calculateBalance = (transactions) => {
  return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
};

export const calculateMonthlyIncome = (transactions, month, year) => {
  return transactions
    .filter((t) => {
      const d = new Date(t.date);
      return t.type === 'income' && d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

export const calculateMonthlyExpenses = (transactions, month, year) => {
  return transactions
    .filter((t) => {
      const d = new Date(t.date);
      return t.type === 'expense' && d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

export const calculateCategoryTotals = (transactions) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const categoryMap = {};

  expenses.forEach((t) => {
    if (categoryMap[t.category]) {
      categoryMap[t.category] += parseFloat(t.amount);
    } else {
      categoryMap[t.category] = parseFloat(t.amount);
    }
  });

  return Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  })).sort((a, b) => b.value - a.value);
};

export const getBiggestSpendingCategory = (transactions) => {
  const totals = calculateCategoryTotals(transactions);
  if (totals.length === 0) return null;
  return totals[0];
};

export const calculateAverageGoalsProgress = (goals) => {
  if (!goals || goals.length === 0) return 0;

  const totalPercentage = goals.reduce((sum, goal) => {
    const saved = typeof goal.saved_amount_base !== 'undefined' ? Number(goal.saved_amount_base) : Number(goal.saved || 0);
    const target = typeof goal.target_amount_base !== 'undefined' ? Number(goal.target_amount_base) : Number(goal.target || 0);

    if (target <= 0) return sum; // Avoid division by zero, progress is 0%

    const p = Math.min(100, Math.round((saved / target) * 100));
    return sum + p;
  }, 0);

  return Math.round(totalPercentage / goals.length);
};

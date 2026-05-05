const STARTED_KEY = 'budgetBuddyStarted';
const TRANSACTIONS_KEY = 'budgetBuddyTransactions';
const GOALS_KEY = 'budgetBuddyGoals';
const SETTINGS_KEY = 'budgetBuddySettings';
const EXCHANGE_RATES_KEY = 'budgetBuddyExchangeRatesCache';

export const getStarted = () => localStorage.getItem(STARTED_KEY) === 'true';
export const setStarted = (value) => localStorage.setItem(STARTED_KEY, String(value));

export const getTransactions = () => {
  const data = localStorage.getItem(TRANSACTIONS_KEY);
  return data ? JSON.parse(data) : [];
};
export const saveTransactions = (transactions) => {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const getGoals = () => {
  const data = localStorage.getItem(GOALS_KEY);
  return data ? JSON.parse(data) : [];
};
export const saveGoals = (goals) => {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
};

export const getSettings = () => {
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : null;
};
export const saveSettings = (settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const getExchangeRatesCache = () => {
  const data = localStorage.getItem(EXCHANGE_RATES_KEY);
  return data ? JSON.parse(data) : null;
};
export const saveExchangeRatesCache = (cache) => {
  localStorage.setItem(EXCHANGE_RATES_KEY, JSON.stringify(cache));
};

export const resetLocalAppData = () => {
  localStorage.removeItem(STARTED_KEY);
  localStorage.removeItem(TRANSACTIONS_KEY);
  localStorage.removeItem(GOALS_KEY);
  localStorage.removeItem(SETTINGS_KEY);
  // Optional: keep exchange rates cache
};

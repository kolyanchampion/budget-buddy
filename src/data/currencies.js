export const CURRENCIES = [
  { code: 'UAH', symbol: '₴', label: 'Ukrainian Hryvnia' },
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'PLN', symbol: 'zł', label: 'Polish Złoty' }
];

export const getCurrencySymbol = (code) => {
  const currency = CURRENCIES.find(c => c.code === code);
  return currency ? currency.symbol : code;
};

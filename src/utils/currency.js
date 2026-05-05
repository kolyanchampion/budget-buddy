import { getCurrencySymbol } from '../data/currencies';

export const formatMoney = (amount, currencyCode) => {
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const convertAmount = (amount, fromCurrency, toCurrency, rates) => {
  if (!amount || isNaN(amount)) return 0;
  if (fromCurrency === toCurrency) return parseFloat(amount);
  
  if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
    return parseFloat(amount); // fallback to original if rates missing
  }

  // rates object assumes USD is base, e.g. { USD: 1, UAH: 38.5, EUR: 0.92, PLN: 4.02 }
  const amountInUSD = parseFloat(amount) / rates[fromCurrency];
  const targetAmount = amountInUSD * rates[toCurrency];
  
  return targetAmount;
};

export const normalizeCurrencyCode = (currency) => {
  return currency ? currency.toUpperCase() : 'UAH';
};

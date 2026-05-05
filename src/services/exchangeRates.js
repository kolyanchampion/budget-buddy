// ExchangeRate-API open endpoint
const API_URL = 'https://open.er-api.com/v6/latest/USD';

export const fetchExchangeRates = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch exchange rates');
    const data = await res.json();
    return data.rates;
  } catch (error) {
    console.error('Exchange rates error:', error);
    throw error;
  }
};

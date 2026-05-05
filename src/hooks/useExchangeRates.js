import { useState, useEffect, useCallback } from 'react';
import { fetchExchangeRates } from '../services/exchangeRates';
import { getExchangeRatesCache, saveExchangeRatesCache } from '../utils/storage';

export const useExchangeRates = () => {
  const [rates, setRates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    
    const loadRates = async () => {
      const cached = getExchangeRatesCache();
      const now = Date.now();
      
      // Use cache if less than 24 hours old
      if (cached && cached.timestamp && (now - cached.timestamp < 24 * 60 * 60 * 1000) && cached.rates) {
        if (mounted) setRates(cached.rates);
        return;
      }
      
      try {
        const newRates = await fetchExchangeRates();
        if (mounted) {
          setRates(newRates);
          saveExchangeRatesCache({ timestamp: now, rates: newRates });
        }
      } catch (err) {
        if (mounted) {
          setError('Exchange rates unavailable. Showing original amounts.');
          // fallback to old cache if available
          if (cached && cached.rates) setRates(cached.rates);
        }
      }
    };
    
    loadRates();
    
    return () => { mounted = false; };
  }, []);

  return { rates, error };
};

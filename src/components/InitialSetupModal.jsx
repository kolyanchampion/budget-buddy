import React, { useState } from 'react';
import { CURRENCIES } from '../data/currencies';
import { ArrowRight } from 'lucide-react';

export default function InitialSetupModal({ onComplete }) {
  const [theme, setTheme] = useState('system');
  const [baseCurrency, setBaseCurrency] = useState('UAH');
  const [displayCurrency, setDisplayCurrency] = useState('UAH');
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({
      theme,
      baseCurrency,
      displayCurrency,
      nickname,
      setupCompleted: true
    });
  };

  const handleRecommended = () => {
    onComplete({
      theme: 'system',
      baseCurrency: 'UAH',
      displayCurrency: 'UAH',
      nickname: '',
      setupCompleted: true
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[var(--modal-bg)] rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 m-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] font-heading mb-2">Set up your Budget Buddy</h2>
        <p className="text-[var(--text-muted)] text-xs sm:text-sm mb-6">Choose your preferences before you start tracking your money.</p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2 sm:py-2.5 text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)]"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Base currency</label>
            <p className="text-xs text-[var(--text-muted)] mb-2">The currency in which new transactions will be saved.</p>
            <select
              value={baseCurrency}
              onChange={(e) => {
                setBaseCurrency(e.target.value);
                if (displayCurrency === baseCurrency) setDisplayCurrency(e.target.value);
              }}
              className="w-full px-4 py-2 sm:py-2.5 text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)]"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.code} ({c.label})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Display currency</label>
            <p className="text-xs text-[var(--text-muted)] mb-2">Used only for viewing converted amounts.</p>
            <select
              value={displayCurrency}
              onChange={(e) => setDisplayCurrency(e.target.value)}
              className="w-full px-4 py-2 sm:py-2.5 text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)]"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.code} ({c.label})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Nickname (optional)</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="How should we call you?"
              className="w-full px-4 py-2 sm:py-2.5 text-sm border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)]"
            />
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
              Complete Setup <ArrowRight size={20} />
            </button>
            <button
              type="button"
              onClick={handleRecommended}
              className="w-full py-3 bg-[var(--bg-soft)] hover:bg-[var(--surface-elevated)] text-[var(--text)] rounded-xl font-semibold transition-colors text-sm border border-[var(--border)]"
            >
              Use recommended settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

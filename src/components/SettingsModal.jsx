import React from 'react';
import { X } from 'lucide-react';
import { CURRENCIES } from '../data/currencies';
import AuthPanel from './AuthPanel';

export default function SettingsModal({ 
  onClose, 
  settings, 
  onUpdateSettings, 
  onResetApp,
  user,
  onLogout,
  onUploadLocalData
}) {
  const handleChange = (key, value) => {
    onUpdateSettings({ [key]: value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div 
        className="bg-[var(--modal-bg)] rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col max-h-full overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-[var(--border)]">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] font-heading">Settings</h2>
          <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:bg-[var(--bg-soft)] rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          <div className="space-y-6 sm:space-y-8">
            <section>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-3 sm:mb-4">Appearance</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm text-[var(--text-muted)]">
                  Theme
                  <select 
                    value={settings.theme} 
                    onChange={e => handleChange('theme', e.target.value)}
                    className="ml-4 px-3 py-1.5 border border-[var(--border)] rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </label>
              </div>
            </section>

            <section>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-3 sm:mb-4">Currency</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[var(--text-muted)] mb-1">Base currency</label>
                  <select 
                    value={settings.baseCurrency} 
                    onChange={e => handleChange('baseCurrency', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                  >
                    {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[var(--text-muted)] mb-1">Display currency</label>
                  <select 
                    value={settings.displayCurrency} 
                    onChange={e => handleChange('displayCurrency', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                  >
                    {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-3 sm:mb-4">Preferences</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[var(--text-muted)] mb-1">Nickname</label>
                  <input 
                    type="text" 
                    value={settings.nickname || ''} 
                    onChange={e => handleChange('nickname', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                    placeholder="Enter nickname"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <section>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-3 sm:mb-4">Account</h3>
              <AuthPanel user={user} onLogout={onLogout} onUploadData={onUploadLocalData} />
            </section>

            <section className="pt-6 sm:pt-8 border-t border-[var(--border)]">
              <h3 className="text-xs sm:text-sm font-bold text-[var(--expense)] uppercase tracking-wider mb-3 sm:mb-4">Danger Zone</h3>
              <p className="text-xs text-[var(--text-muted)] mb-3">This will permanently delete all your tracking data.</p>
              <button 
                onClick={() => {
                  onClose();
                  onResetApp();
                }}
                className="w-full px-4 py-2 bg-[var(--expense)]/10 hover:bg-[var(--expense)]/20 text-[var(--expense)] text-sm font-bold rounded-lg transition-colors border border-[var(--expense)]/20"
              >
                Reset App Data
              </button>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}

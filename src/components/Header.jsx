import React, { useState } from 'react';
import { Wallet, Menu, X, Settings } from 'lucide-react';
import SettingsModal from './SettingsModal';

export default function Header({ user, settings, onUpdateSettings, onResetApp, onLogout, onUploadLocalData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-[var(--border)] transition-colors w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2">
              <div className="bg-[var(--primary)] p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white">
                <Wallet size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="font-bold text-lg sm:text-xl text-[var(--text)] font-heading">Budget Buddy</span>
            </div>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#overview" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] font-medium transition-colors">Overview</a>
              <a href="#transactions" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] font-medium transition-colors">Transactions</a>
              <a href="#calendar" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] font-medium transition-colors">Calendar</a>
              <a href="#goals" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] font-medium transition-colors">Goals</a>
              <a href="#insights" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] font-medium transition-colors">Insights</a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {user && <span className="text-xs font-medium text-[var(--text-muted)] max-w-[150px] truncate">{user.email}</span>}
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 text-[var(--text-muted)] hover:bg-[var(--bg-soft)] hover:text-[var(--text)] rounded-lg transition-colors"
                aria-label="Settings"
              >
                <Settings size={20} />
              </button>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 md:hidden">
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 text-[var(--text-muted)] hover:bg-[var(--bg-soft)] rounded-lg transition-colors"
              >
                <Settings size={20} />
              </button>
              <button 
                className="p-2 text-[var(--text-muted)] hover:bg-[var(--bg-soft)] rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-[var(--surface)] border-b border-[var(--border)] px-4 pt-2 pb-4 space-y-3 shadow-lg absolute w-full left-0 top-[56px] sm:top-[64px]">
            <a href="#overview" onClick={() => setIsOpen(false)} className="block text-[var(--text-muted)] hover:text-[var(--text)] font-medium py-2">Overview</a>
            <a href="#transactions" onClick={() => setIsOpen(false)} className="block text-[var(--text-muted)] hover:text-[var(--text)] font-medium py-2">Transactions</a>
            <a href="#calendar" onClick={() => setIsOpen(false)} className="block text-[var(--text-muted)] hover:text-[var(--text)] font-medium py-2">Calendar</a>
            <a href="#goals" onClick={() => setIsOpen(false)} className="block text-[var(--text-muted)] hover:text-[var(--text)] font-medium py-2">Goals</a>
            <a href="#insights" onClick={() => setIsOpen(false)} className="block text-[var(--text-muted)] hover:text-[var(--text)] font-medium py-2">Insights</a>
          </div>
        )}
      </header>

      {showSettings && (
        <SettingsModal 
          onClose={() => setShowSettings(false)}
          settings={settings}
          onUpdateSettings={onUpdateSettings}
          onResetApp={onResetApp}
          user={user}
          onLogout={onLogout}
          onUploadLocalData={onUploadLocalData}
        />
      )}
    </>
  );
}

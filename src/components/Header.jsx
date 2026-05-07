import React, { useState } from 'react';
import { Wallet, Menu, X, Settings } from 'lucide-react';
import SettingsModal from './SettingsModal';

const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Transactions', href: '#transactions' },
  { label: 'Calendar', href: '#calendar' },
  { label: 'Goals', href: '#goals' },
  { label: 'Insights', href: '#insights' },
];

export default function Header({ user, settings, onUpdateSettings, onResetApp, onLogout, onUploadLocalData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="app-header sticky top-0 z-50 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <a href="#overview" className="brand-lockup" aria-label="Budget Buddy home">
              <span className="brand-icon">
                <Wallet size={20} className="sm:w-6 sm:h-6" />
              </span>
              <span className="brand-name">Budget Buddy</span>
            </a>

            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              {user && (
                <span className="user-email">
                  {user.email}
                </span>
              )}

              <button 
                onClick={() => setShowSettings(true)}
                className="icon-button"
                aria-label="Settings"
                type="button"
              >
                <Settings size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button 
                onClick={() => setShowSettings(true)}
                className="icon-button"
                aria-label="Settings"
                type="button"
              >
                <Settings size={20} />
              </button>

              <button 
                className="icon-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                type="button"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="mobile-nav md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="mobile-nav-link"
              >
                {item.label}
              </a>
            ))}
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

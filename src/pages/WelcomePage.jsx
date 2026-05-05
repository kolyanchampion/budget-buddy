import React, { useState } from 'react';
import { ArrowRight, PieChart, TrendingUp, Wallet, Target, LayoutDashboard } from 'lucide-react';
import SettingsModal from '../components/SettingsModal';

export default function WelcomePage({ onStart }) {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center relative overflow-hidden py-8 md:py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[var(--primary)]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[var(--income)]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-x-1/3 translate-y-1/4"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
        <div className="text-center lg:text-left pt-4 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
            </span>
            Student Finance Tracker
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text)] tracking-tight mb-6 leading-tight font-heading">
            Take control of your money with <span className="text-[var(--primary)]">Budget Buddy</span>
          </h1>
          
          <p className="text-base sm:text-lg text-[var(--text-muted)] mb-8 max-w-lg mx-auto lg:mx-0">
            A beautiful, simple, and stress-free way to manage your finances, designed specifically for students and beginners.
          </p>

          <div className="space-y-4 mb-10 text-left max-w-xs sm:max-w-sm mx-auto lg:mx-0">
            <div className="flex items-center gap-3 text-[var(--text)] font-medium">
              <LayoutDashboard className="text-[var(--primary)]" size={24} />
              <span>Track your money daily</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--text)] font-medium">
              <Target className="text-[var(--primary)]" size={24} />
              <span>Plan your savings goals</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--text)] font-medium">
              <PieChart className="text-[var(--primary)]" size={24} />
              <span>Understand your spending</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[var(--primary)]/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              Start Tracking <ArrowRight size={24} />
            </button>
            <button 
              onClick={() => setShowAuth(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--bg-soft)] rounded-2xl font-bold text-lg transition-all"
            >
              Log in
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-md mx-auto hidden lg:block">
          <div className="absolute -top-6 -right-6 bg-[var(--surface)] p-4 rounded-2xl shadow-xl z-20 animate-bounce border border-[var(--border)]">
            <div className="flex items-center gap-2 text-[var(--income)] font-bold">
              <TrendingUp size={20} /> +$120
            </div>
          </div>

          <div className="glass-card p-8 relative shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-[var(--primary)] p-2 rounded-xl text-white">
                <Wallet size={24} />
              </div>
              <span className="font-bold text-xl text-[var(--text)] font-heading">Budget Buddy</span>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Current Balance</p>
              <h2 className="text-5xl font-extrabold text-[var(--text)] font-heading">$420.00</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[var(--bg-soft)] p-5 rounded-2xl border border-[var(--border)]">
                <div className="text-[var(--primary)] mb-2"><Wallet size={24} /></div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Income</p>
                <p className="text-xl font-bold text-[var(--text)]">$650.00</p>
              </div>
              <div className="bg-[var(--bg-soft)] p-5 rounded-2xl border border-[var(--border)]">
                <div className="text-[var(--expense)] mb-2"><PieChart size={24} /></div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Expenses</p>
                <p className="text-xl font-bold text-[var(--text)]">$230.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAuth && (
        <SettingsModal 
          onClose={() => setShowAuth(false)} 
          settings={{ theme: 'system', baseCurrency: 'UAH', displayCurrency: 'UAH' }}
          onUpdateSettings={() => {}}
          user={null}
        />
      )}
    </div>
  );
}

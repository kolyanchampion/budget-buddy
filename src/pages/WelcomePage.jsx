import React, { useState } from 'react';
import { ArrowRight, PieChart, TrendingUp, Wallet, Target, LayoutDashboard } from 'lucide-react';
import SettingsModal from '../components/SettingsModal';

export default function WelcomePage({ onStart }) {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="welcome-shell">
      <section className="welcome-hero-panel">
      <div className="welcome-blur welcome-blur--1" />
      <div className="welcome-blur welcome-blur--2" />
      <div className="welcome-blur welcome-blur--3" />
      <div className="welcome-blur welcome-blur--4" />

      <div className="welcome-hero-grid">
          <div className="welcome-copy">
            <div className="welcome-badge">
              <span className="welcome-badge__dot" />
              Student Finance Tracker
            </div>

            <h1 className="welcome-title">
              Take control of your money with{' '}
              <span>Budget Buddy</span>
            </h1>

            <p className="welcome-subtitle">
              A beautiful, simple, and stress-free way to manage your finances,
              designed specifically for students and beginners.
            </p>

            <div className="welcome-feature-list">
              <div className="welcome-feature-item">
                <LayoutDashboard size={22} />
                <span>Track your money daily</span>
              </div>

              <div className="welcome-feature-item">
                <Target size={22} />
                <span>Plan your savings goals</span>
              </div>

              <div className="welcome-feature-item">
                <PieChart size={22} />
                <span>Understand your spending</span>
              </div>
            </div>

            <div className="welcome-actions">
              <button
                onClick={onStart}
                className="welcome-btn welcome-btn--primary"
                type="button"
              >
                Start Tracking <ArrowRight size={22} />
              </button>

              <button
                onClick={() => setShowAuth(true)}
                className="welcome-btn welcome-btn--secondary"
                type="button"
              >
                Log in
              </button>
            </div>
          </div>

          <div className="welcome-preview-wrap">
            <div className="welcome-floating-badge">
              <TrendingUp size={18} />
              +$120
            </div>

            <div className="welcome-preview-card">
              <div className="welcome-preview-card__brand">
                <div className="welcome-preview-card__logo">
                  <Wallet size={22} />
                </div>
                <span>Budget Buddy</span>
              </div>

              <div className="welcome-preview-card__balance">
                <p>Current Balance</p>
                <h2>$420.00</h2>
              </div>

              <div className="welcome-preview-stats">
                <div className="welcome-preview-stat">
                  <div className="welcome-preview-stat__icon is-income">
                    <Wallet size={22} />
                  </div>
                  <p>Income</p>
                  <strong>$650.00</strong>
                </div>

                <div className="welcome-preview-stat">
                  <div className="welcome-preview-stat__icon is-expense">
                    <PieChart size={22} />
                  </div>
                  <p>Expenses</p>
                  <strong>$230.00</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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


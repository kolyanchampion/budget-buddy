import React, { useState } from 'react';
import { signUp, logIn } from '../services/authService';
import { getTransactions, getGoals } from '../utils/storage';
import { isSupabaseConfigured } from '../lib/supabaseClient';

export default function AuthPanel({ user, onUploadData, onLogout }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSyncPrompt, setShowSyncPrompt] = useState(false);

  if (!isSupabaseConfigured && !user) {
    return (
      <div className="auth-warning">
        <h4>Supabase is not configured</h4>
        <p>
          Create a <code>.env</code> file with <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>, then restart <code>npm run dev</code> to enable cloud sync.
        </p>
        <p className="auth-warning__note">
          You are currently in Guest mode.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await logIn(email, password);
      } else {
        await signUp(email, password);
      }
      
      const localTxs = getTransactions();
      const localGoals = getGoals();

      if (localTxs.length > 0 || localGoals.length > 0) {
        setShowSyncPrompt(true);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    onUploadData();
    setShowSyncPrompt(false);
  };

  if (showSyncPrompt) {
    return (
      <div className="auth-card">
        <h4 className="auth-card__title">Sync Local Data?</h4>
        <p className="auth-card__text">
          You have local transactions and goals. Do you want to upload them to your account?
        </p>

        <div className="auth-actions">
          <button onClick={handleUpload} className="auth-button auth-button--primary" type="button">
            Upload local data
          </button>

          <button onClick={() => setShowSyncPrompt(false)} className="auth-button auth-button--secondary" type="button">
            Keep cloud data
          </button>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="auth-stack">
        <div className="auth-card">
          <p className="auth-card__label">Logged in as</p>
          <p className="auth-card__email">{user.email}</p>

          <div className="auth-sync-status">
            <span />
            Cloud sync enabled
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="auth-button auth-button--secondary auth-button--full"
          type="button"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="auth-panel">
      <div className="auth-tabs">
        <button
          className={`auth-tab ${isLogin ? 'is-active' : ''}`}
          onClick={() => { setIsLogin(true); setError(''); }}
          type="button"
        >
          Log In
        </button>

        <button
          className={`auth-tab ${!isLogin ? 'is-active' : ''}`}
          onClick={() => { setIsLogin(false); setError(''); }}
          type="button"
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth-button auth-button--primary auth-button--full"
        >
          {loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Sign Up')}
        </button>
      </form>
      
      {!user && (
        <p className="auth-helper">
          Guest mode: data is saved only on this device. Log in to sync to the cloud.
        </p>
      )}
    </div>
  );
}

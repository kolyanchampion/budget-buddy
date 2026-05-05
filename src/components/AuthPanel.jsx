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
      <div className="p-4 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800/50 rounded-xl">
        <h4 className="font-bold text-orange-800 dark:text-orange-400 mb-2">Supabase is not configured</h4>
        <p className="text-sm text-orange-700 dark:text-orange-300">
          Create a <code>.env</code> file with <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>, then restart <code>npm run dev</code> to enable cloud sync.
        </p>
        <p className="text-sm text-orange-700 dark:text-orange-300 mt-2 font-medium">
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
      <div className="p-4 bg-[var(--bg-soft)] rounded-xl border border-[var(--border)]">
        <h4 className="font-bold text-[var(--primary)] mb-2">Sync Local Data?</h4>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          You have local transactions and goals. Do you want to upload them to your account?
        </p>
        <div className="flex gap-2">
          <button onClick={handleUpload} className="px-3 py-1.5 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-hover)]">
            Upload local data
          </button>
          <button onClick={() => setShowSyncPrompt(false)} className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] text-sm font-medium rounded-lg hover:bg-[var(--bg-soft)]">
            Keep cloud data
          </button>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-[var(--bg-soft)] rounded-xl border border-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)] mb-1">Logged in as</p>
          <p className="font-bold text-[var(--text)]">{user.email}</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-[var(--income)]">
            <span className="w-2 h-2 rounded-full bg-[var(--income)]"></span> Cloud sync enabled
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full py-2 bg-[var(--surface-muted)] hover:bg-[var(--border)] text-[var(--text)] rounded-lg text-sm font-medium transition-colors"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex border-b border-[var(--border)] mb-4">
        <button
          className={`pb-2 px-4 text-sm font-medium border-b-2 transition-colors ${isLogin ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          onClick={() => { setIsLogin(true); setError(''); }}
        >
          Log In
        </button>
        <button
          className={`pb-2 px-4 text-sm font-medium border-b-2 transition-colors ${!isLogin ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          onClick={() => { setIsLogin(false); setError(''); }}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-[var(--expense)]/10 text-[var(--expense)] border border-[var(--expense)]/20 text-sm rounded-lg">
            {error}
          </div>
        )}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)]"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--input-bg)] text-[var(--input-text)]"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Sign Up')}
        </button>
      </form>
      
      {!user && (
        <p className="mt-4 text-xs text-[var(--text-muted)] text-center">
          Guest mode: data is saved only on this device. Log in to sync to the cloud.
        </p>
      )}
    </div>
  );
}

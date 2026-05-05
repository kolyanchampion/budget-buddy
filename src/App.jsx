import React, { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import InitialSetupModal from './components/InitialSetupModal';
import { getStarted, setStarted, getTransactions, getGoals } from './utils/storage';
import { useAuth } from './hooks/useAuth';
import { useSettings } from './hooks/useSettings';
import { useBudgetData } from './hooks/useBudgetData';
import { useExchangeRates } from './hooks/useExchangeRates';
import { logOut } from './services/authService';

function App() {
  const { user, loading: authLoading } = useAuth();
  const { settings, updateSettings, loading: settingsLoading } = useSettings(user);
  const { 
    transactions, goals, loading: dataLoading, 
    addTransaction, removeTransaction, 
    addGoal, editGoal, removeGoal, 
    resetData, setTransactions, setGoals 
  } = useBudgetData(user);
  const { rates } = useExchangeRates();

  const [isStarted, setIsStarted] = useState(getStarted());

  const handleStartTracking = () => {
    setIsStarted(true);
    setStarted(true);
  };

  const handleSetupComplete = async (newSettings) => {
    await updateSettings(newSettings);
    // If guest and just started, clear mock/old local data just in case
    if (!user) {
      if (getTransactions().length > 0) setTransactions([]);
      if (getGoals().length > 0) setGoals([]);
    }
  };

  const handleResetApp = async () => {
    await resetData();
    setIsStarted(false);
    setStarted(false);
  };

  const handleUploadLocalData = async () => {
    if (!user) return;
    const localTxs = getTransactions();
    const localGoals = getGoals();
    
    // Upload logic: add one by one
    for (const tx of localTxs) {
      await addTransaction({
        title: tx.title, type: tx.type, category: tx.category,
        amount_base: parseFloat(tx.amount_base || tx.amount),
        base_currency: tx.base_currency || settings?.baseCurrency || 'UAH',
        date: tx.date
      });
    }
    for (const g of localGoals) {
      await addGoal({
        title: g.title,
        target_amount_base: parseFloat(g.target_amount_base || g.target),
        saved_amount_base: parseFloat(g.saved_amount_base || g.saved || 0),
        base_currency: g.base_currency || settings?.baseCurrency || 'UAH'
      });
    }
    await updateSettings({ setupCompleted: true });
  };

  if (authLoading || settingsLoading) {
    return <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center text-[var(--text-muted)]">Loading Budget Buddy...</div>;
  }

  const isSetupRequired = !settings?.setupCompleted;
  const showWelcome = !user && !isStarted;

  if (showWelcome) {
    return <WelcomePage onStart={handleStartTracking} />;
  }

  if (isSetupRequired && (isStarted || user)) {
    return <InitialSetupModal onComplete={handleSetupComplete} />;
  }

  return (
    <DashboardPage 
      user={user}
      settings={settings}
      transactions={transactions}
      goals={goals}
      rates={rates}
      onUpdateSettings={updateSettings}
      onAddTransaction={addTransaction}
      onDeleteTransaction={removeTransaction}
      onAddGoal={addGoal}
      onUpdateGoal={editGoal}
      onDeleteGoal={removeGoal}
      onResetApp={handleResetApp}
      onLogout={logOut}
      onUploadLocalData={handleUploadLocalData}
    />
  );
}

export default App;

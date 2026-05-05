import { useState, useEffect } from 'react';
import { 
  getTransactions, saveTransactions, 
  getGoals, saveGoals, 
  resetLocalAppData, getStarted 
} from '../utils/storage';
import { 
  fetchTransactions, createTransaction, deleteTransaction,
  fetchGoals, createGoal, updateGoal, deleteGoal, deleteUserBudgetData
} from '../services/dbService';

export const useBudgetData = (user) => {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setLoading(true);
      if (user) {
        try {
          const [dbTxs, dbGoals] = await Promise.all([
            fetchTransactions(user.id),
            fetchGoals(user.id)
          ]);
          if (mounted) {
            setTransactions(dbTxs);
            setGoals(dbGoals);
          }
        } catch (e) {
          console.error("Error loading data from DB", e);
        }
      } else {
        if (mounted) {
          // In guest mode, load from localStorage if started, else empty arrays
          setTransactions(getStarted() ? getTransactions() : []);
          setGoals(getStarted() ? getGoals() : []);
        }
      }
      if (mounted) setLoading(false);
    };

    loadData();

    return () => { mounted = false; };
  }, [user]);

  // Persist to local storage in guest mode on change
  useEffect(() => {
    if (!user && !loading && getStarted()) {
      saveTransactions(transactions);
      saveGoals(goals);
    }
  }, [transactions, goals, user, loading]);

  const addTransaction = async (txData) => {
    if (user) {
      const newTx = await createTransaction(user.id, txData);
      if (newTx) setTransactions(prev => [newTx, ...prev]);
    } else {
      const newTx = { ...txData, id: Date.now().toString(), created_at: new Date().toISOString() };
      setTransactions(prev => [newTx, ...prev]);
    }
  };

  const removeTransaction = async (id) => {
    if (user) {
      await deleteTransaction(user.id, id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } else {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const addGoal = async (goalData) => {
    if (user) {
      const newGoal = await createGoal(user.id, goalData);
      if (newGoal) setGoals(prev => [...prev, newGoal]);
    } else {
      const newGoal = { ...goalData, id: Date.now().toString(), created_at: new Date().toISOString() };
      setGoals(prev => [...prev, newGoal]);
    }
  };

  const editGoal = async (id, updates) => {
    if (user) {
      await updateGoal(user.id, id, updates);
      setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
    } else {
      setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
    }
  };

  const removeGoal = async (id) => {
    if (user) {
      await deleteGoal(user.id, id);
      setGoals(prev => prev.filter(g => g.id !== id));
    } else {
      setGoals(prev => prev.filter(g => g.id !== id));
    }
  };

  const resetData = async () => {
    if (user) {
      await deleteUserBudgetData(user.id);
      setTransactions([]);
      setGoals([]);
    } else {
      resetLocalAppData();
      setTransactions([]);
      setGoals([]);
    }
  };

  return {
    transactions,
    goals,
    loading,
    setTransactions, // expose for migration
    setGoals, // expose for migration
    addTransaction,
    removeTransaction,
    addGoal,
    editGoal,
    removeGoal,
    resetData
  };
};

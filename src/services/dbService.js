import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

// Settings
export const fetchUserSettings = async (userId) => {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase.from('user_settings').select('*').eq('user_id', userId).single();
  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error('Error fetching settings:', error);
    return null;
  }
  
  if (data) {
    return {
      theme: data.theme,
      baseCurrency: data.base_currency,
      displayCurrency: data.display_currency,
      monthlyBudgetLimit: data.monthly_budget_limit,
      savingsReminderEnabled: data.savings_reminder_enabled,
      nickname: data.nickname,
      setupCompleted: data.setup_completed
    };
  }
  return null;
};

export const upsertUserSettings = async (userId, settings) => {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from('user_settings').upsert({
    user_id: userId,
    theme: settings.theme,
    base_currency: settings.baseCurrency,
    display_currency: settings.displayCurrency,
    monthly_budget_limit: settings.monthlyBudgetLimit,
    savings_reminder_enabled: settings.savingsReminderEnabled,
    nickname: settings.nickname,
    setup_completed: settings.setupCompleted,
    updated_at: new Date().toISOString()
  }, { onConflict: 'user_id' });
  
  if (error) throw error;
};

// Transactions
export const fetchTransactions = async (userId) => {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase.from('transactions').select('*').eq('user_id', userId).order('date', { ascending: false });
  if (error) throw error;
  
  return data.map(d => ({
    id: d.id,
    title: d.title,
    type: d.type,
    category: d.category,
    amount_base: parseFloat(d.amount_base),
    base_currency: d.base_currency,
    date: d.date,
    created_at: d.created_at
  }));
};

export const createTransaction = async (userId, transaction) => {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase.from('transactions').insert([{
    user_id: userId,
    title: transaction.title,
    type: transaction.type,
    category: transaction.category,
    amount_base: transaction.amount_base,
    base_currency: transaction.base_currency,
    date: transaction.date
  }]).select().single();
  
  if (error) throw error;
  
  return {
    id: data.id,
    title: data.title,
    type: data.type,
    category: data.category,
    amount_base: parseFloat(data.amount_base),
    base_currency: data.base_currency,
    date: data.date,
    created_at: data.created_at
  };
};

export const deleteTransaction = async (userId, transactionId) => {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from('transactions').delete().eq('id', transactionId).eq('user_id', userId);
  if (error) throw error;
};

// Goals
export const fetchGoals = async (userId) => {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase.from('goals').select('*').eq('user_id', userId).order('created_at', { ascending: true });
  if (error) throw error;
  
  return data.map(d => ({
    id: d.id,
    title: d.title,
    target_amount_base: parseFloat(d.target_amount_base),
    saved_amount_base: parseFloat(d.saved_amount_base),
    base_currency: d.base_currency,
    created_at: d.created_at
  }));
};

export const createGoal = async (userId, goal) => {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase.from('goals').insert([{
    user_id: userId,
    title: goal.title,
    target_amount_base: goal.target_amount_base,
    saved_amount_base: goal.saved_amount_base || 0,
    base_currency: goal.base_currency
  }]).select().single();
  
  if (error) throw error;
  
  return {
    id: data.id,
    title: data.title,
    target_amount_base: parseFloat(data.target_amount_base),
    saved_amount_base: parseFloat(data.saved_amount_base),
    base_currency: data.base_currency,
    created_at: data.created_at
  };
};

export const updateGoal = async (userId, goalId, updates) => {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from('goals').update({
    saved_amount_base: updates.saved_amount_base,
    updated_at: new Date().toISOString()
  }).eq('id', goalId).eq('user_id', userId);
  
  if (error) throw error;
};

export const deleteGoal = async (userId, goalId) => {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from('goals').delete().eq('id', goalId).eq('user_id', userId);
  if (error) throw error;
};

export const deleteUserBudgetData = async (userId) => {
  if (!isSupabaseConfigured || !supabase) return;
  await supabase.from('transactions').delete().eq('user_id', userId);
  await supabase.from('goals').delete().eq('user_id', userId);
  await supabase.from('user_settings').update({ setup_completed: false }).eq('user_id', userId);
};

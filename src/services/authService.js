import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export const signUp = async (email, password) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase client not initialized. Please configure .env');
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data.user;
};

export const logIn = async (email, password) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase client not initialized. Please configure .env');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
};

export const logOut = async () => {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return null;
  return session.user;
};

export const onAuthStateChange = (callback) => {
  if (!isSupabaseConfigured || !supabase) return { data: { subscription: { unsubscribe: () => {} } } };
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
};

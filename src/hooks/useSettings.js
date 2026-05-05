import { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../utils/storage';
import { fetchUserSettings, upsertUserSettings } from '../services/dbService';
import { DEFAULT_SETTINGS } from '../utils/defaultSettings';

export const useSettings = (user) => {
  const [settings, setSettingsState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Apply theme side-effect
  useEffect(() => {
    if (!settings) return;
    const root = document.documentElement;
    const applyTheme = (theme) => {
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
      } else {
        root.setAttribute('data-theme', theme);
      }
    };
    applyTheme(settings.theme);

    // Listen for system theme changes if set to system
    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings?.theme]);

  // Load settings
  useEffect(() => {
    let mounted = true;
    
    const load = async () => {
      setLoading(true);
      if (user) {
        try {
          const dbSettings = await fetchUserSettings(user.id);
          if (mounted) setSettingsState(dbSettings || DEFAULT_SETTINGS);
        } catch (e) {
          console.error('Failed to load settings from DB', e);
          if (mounted) setSettingsState(DEFAULT_SETTINGS);
        }
      } else {
        const localSettings = getSettings();
        if (mounted) setSettingsState(localSettings || DEFAULT_SETTINGS);
      }
      if (mounted) setLoading(false);
    };

    load();
    return () => { mounted = false; };
  }, [user]);

  const updateSettings = async (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettingsState(updated);
    
    if (user) {
      try {
        await upsertUserSettings(user.id, updated);
      } catch (e) {
        console.error('Failed to save settings to DB', e);
      }
    } else {
      saveSettings(updated);
    }
  };

  return { settings, updateSettings, loading };
};

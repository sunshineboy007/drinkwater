import { useState, useEffect, useCallback } from 'react';
import { UserSettings, DailyRecord, DEFAULT_SETTINGS } from '../types';
import * as Storage from '../utils/storage';

export function useDrinkingData() {
  const [todayCups, setTodayCupsState] = useState(0);
  const [settings, setSettingsState] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [history, setHistoryState] = useState<DailyRecord[]>([]);
  const [streak, setStreakState] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const cups = await Storage.initDailyReset();
      const s = await Storage.getSettings();
      const h = await Storage.getHistory();
      const st = await Storage.getStreak();
      setTodayCupsState(cups);
      setSettingsState(s);
      setHistoryState(h);
      setStreakState(st);
    } catch (e) {
      console.error('Failed to load data:', e);
    } finally {
      setLoading(false);
    }
  }

  const drinkOneCup = useCallback(async () => {
    const newCups = todayCups + 1;
    setTodayCupsState(newCups);
    await Storage.setTodayCups(newCups);
    return newCups;
  }, [todayCups]);

  const updateSettings = useCallback(async (newSettings: UserSettings) => {
    setSettingsState(newSettings);
    await Storage.setSettings(newSettings);
  }, []);

  const resetToday = useCallback(async () => {
    await Storage.resetTodayData();
    setTodayCupsState(0);
    await Storage.setTodayCups(0);
    await Storage.setTodayDate(new Date().toISOString().split('T')[0]);
  }, []);

  const refreshHistory = useCallback(async () => {
    const h = await Storage.getHistory();
    const st = await Storage.getStreak();
    setHistoryState(h);
    setStreakState(st);
  }, []);

  return {
    todayCups,
    settings,
    history,
    streak,
    loading,
    drinkOneCup,
    updateSettings,
    resetToday,
    refreshHistory,
    reload: loadData,
  };
}

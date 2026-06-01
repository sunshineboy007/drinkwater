import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyRecord, UserSettings, DEFAULT_SETTINGS } from '../types';
import { getTodayString } from './dateUtils';

const KEYS = {
  TODAY_CUPS: 'today_cups',
  TODAY_DATE: 'today_date',
  HISTORY: 'drink_history',
  SETTINGS: 'user_settings',
  STREAK: 'streak_count',
};

export async function getTodayCups(): Promise<number> {
  const val = await AsyncStorage.getItem(KEYS.TODAY_CUPS);
  return val ? parseInt(val, 10) : 0;
}

export async function setTodayCups(cups: number): Promise<void> {
  await AsyncStorage.setItem(KEYS.TODAY_CUPS, String(cups));
}

export async function getTodayDate(): Promise<string> {
  const val = await AsyncStorage.getItem(KEYS.TODAY_DATE);
  return val || '';
}

export async function setTodayDate(date: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.TODAY_DATE, date);
}

export async function getHistory(): Promise<DailyRecord[]> {
  const val = await AsyncStorage.getItem(KEYS.HISTORY);
  return val ? JSON.parse(val) : [];
}

export async function setHistory(history: DailyRecord[]): Promise<void> {
  const trimmed = history.slice(-30);
  await AsyncStorage.setItem(KEYS.HISTORY, JSON.stringify(trimmed));
}

export async function getSettings(): Promise<UserSettings> {
  const val = await AsyncStorage.getItem(KEYS.SETTINGS);
  return val ? { ...DEFAULT_SETTINGS, ...JSON.parse(val) } : DEFAULT_SETTINGS;
}

export async function setSettings(settings: UserSettings): Promise<void> {
  await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
}

export async function getStreak(): Promise<number> {
  const val = await AsyncStorage.getItem(KEYS.STREAK);
  return val ? parseInt(val, 10) : 0;
}

export async function setStreak(streak: number): Promise<void> {
  await AsyncStorage.setItem(KEYS.STREAK, String(streak));
}

export async function resetTodayData(): Promise<void> {
  await AsyncStorage.multiRemove([KEYS.TODAY_CUPS, KEYS.TODAY_DATE]);
}

export async function initDailyReset(): Promise<number> {
  const savedDate = await getTodayDate();
  const today = getTodayString();

  if (savedDate !== today) {
    const yesterdayCups = await getTodayCups();
    const settings = await getSettings();
    const streak = await getStreak();

    if (savedDate) {
      const history = await getHistory();
      const goalMet = yesterdayCups >= settings.dailyGoal;
      history.push({ date: savedDate, cups: yesterdayCups, goalMet });
      await setHistory(history);

      const newStreak = goalMet ? streak + 1 : 0;
      await setStreak(newStreak);
    }

    await setTodayCups(0);
    await setTodayDate(today);
    return 0;
  }

  return await getTodayCups();
}

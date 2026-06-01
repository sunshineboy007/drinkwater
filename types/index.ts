export interface DailyRecord {
  date: string;
  cups: number;
  goalMet: boolean;
}

export interface UserSettings {
  dailyGoal: number;
  mlPerCup: number;
  reminderInterval: number;
  quietStart: string;
  quietEnd: string;
  reminderEnabled: boolean;
}

export interface AppState {
  todayCups: number;
  settings: UserSettings;
  history: DailyRecord[];
  streak: number;
}

export const DEFAULT_SETTINGS: UserSettings = {
  dailyGoal: 8,
  mlPerCup: 250,
  reminderInterval: 30,
  quietStart: '23:00',
  quietEnd: '07:00',
  reminderEnabled: true,
};

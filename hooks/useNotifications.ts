import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import { UserSettings } from '../types';

let Notifications: typeof import('expo-notifications') | null = null;
try {
  Notifications = require('expo-notifications');
  if (Notifications) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }
} catch {
  console.warn('expo-notifications not available in this environment');
}

export function useNotifications(settings: UserSettings) {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (!Notifications) return;
    requestPermissions();
    setupChannel();
  }, []);

  useEffect(() => {
    if (hasPermission && settings.reminderEnabled && Notifications) {
      scheduleReminders(settings);
    }
  }, [settings, hasPermission]);

  async function setupChannel() {
    if (!Notifications || Platform.OS !== 'android') return;
    try {
      await Notifications.setNotificationChannelAsync('water-reminder', {
        name: '喝水提醒',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        sound: 'default',
      });
    } catch {}
  }

  async function requestPermissions(): Promise<boolean> {
    if (!Notifications || !Device.isDevice) {
      setHasPermission(false);
      return false;
    }

    try {
      if (Platform.OS === 'android') {
        await setupChannel();
      }
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      const granted = finalStatus === 'granted';
      setHasPermission(granted);
      return granted;
    } catch {
      setHasPermission(false);
      return false;
    }
  }

  return { hasPermission, requestPermissions };
}

function parseTime(timeStr: string): { hour: number; minute: number } {
  const [h, m] = timeStr.split(':').map(Number);
  return { hour: h, minute: m };
}

function isQuietTime(now: Date, quietStart: string, quietEnd: string): boolean {
  const start = parseTime(quietStart);
  const end = parseTime(quietEnd);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = start.hour * 60 + start.minute;
  const endMinutes = end.hour * 60 + end.minute;
  if (startMinutes <= endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  }
  return currentMinutes >= startMinutes || currentMinutes < endMinutes;
}

const reminderQuotes = [
  '你的细胞正在沙漠里爬行 🏜️',
  '喝水！现在！马上！立刻！',
  '摸鱼摸鱼，顺便喝口水～',
  '水是你最便宜的护肤品 💆',
  '喝口水，对自己好一点 🌊',
  '记得喝水哦，你值得被好好照顾',
  '您有一杯白开水正在等待取餐 🛵',
  '今日水签：宜补水，诸事顺遂 🔮',
];

async function scheduleReminders(settings: UserSettings) {
  if (!Notifications) return;
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    const now = new Date();
    const intervalMs = settings.reminderInterval * 60 * 1000;
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    let nextTime = new Date(now.getTime() + intervalMs);
    let count = 0;
    while (nextTime < endOfDay && count < 48) {
      if (!isQuietTime(nextTime, settings.quietStart, settings.quietEnd)) {
        const quote = reminderQuotes[Math.floor(Math.random() * reminderQuotes.length)];
        const delaySeconds = Math.floor((nextTime.getTime() - Date.now()) / 1000);
        if (delaySeconds > 0) {
          await Notifications.scheduleNotificationAsync({
            content: { title: '喝水提醒 💧', body: quote, sound: 'default' },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
              seconds: delaySeconds,
              channelId: 'water-reminder',
            },
          });
          count++;
        }
      }
      nextTime = new Date(nextTime.getTime() + intervalMs);
    }
  } catch (e) {
    console.warn('Failed to schedule notifications:', e);
  }
}

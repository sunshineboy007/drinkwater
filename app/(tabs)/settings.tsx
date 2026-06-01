import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput, Alert, Platform } from 'react-native';
import { useDrinkingData } from '../../hooks/useDrinkingData';
import { Colors, FontSize, Spacing } from '../../constants/theme';
import { UserSettings } from '../../types';


const GOAL_OPTIONS = [6, 8, 10, 12];
const ML_OPTIONS = [150, 200, 250, 300];
const INTERVAL_OPTIONS = [15, 30, 45, 60, 90];

export default function SettingsScreen() {
  const { settings, updateSettings, resetToday } = useDrinkingData();
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  function handleChange<K extends keyof UserSettings>(key: K, value: UserSettings[K]) {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  }

  function handleResetToday() {
    Alert.alert('重置今日数据', '确定要重置今日喝水记录吗？', [
      { text: '取消', style: 'cancel' },
      { text: '确定', style: 'destructive', onPress: () => resetToday() },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>设置</Text>

      {/* Goal section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>喝水目标</Text>
        <Text style={styles.label}>每日目标杯数</Text>
        <View style={styles.optionRow}>
          {GOAL_OPTIONS.map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.optionBtn, localSettings.dailyGoal === g && styles.optionActive]}
              onPress={() => handleChange('dailyGoal', g)}
            >
              <Text style={[styles.optionText, localSettings.dailyGoal === g && styles.optionTextActive]}>
                {g}杯
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>每杯水量</Text>
        <View style={styles.optionRow}>
          {ML_OPTIONS.map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.optionBtn, localSettings.mlPerCup === m && styles.optionActive]}
              onPress={() => handleChange('mlPerCup', m)}
            >
              <Text style={[styles.optionText, localSettings.mlPerCup === m && styles.optionTextActive]}>
                {m}ml
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reminder section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>提醒设置</Text>
        <View style={styles.switchRow}>
          <Text style={styles.label}>开启提醒</Text>
          <Switch
            value={localSettings.reminderEnabled}
            onValueChange={(v) => handleChange('reminderEnabled', v)}
            trackColor={{ true: Colors.primary }}
          />
        </View>

        {localSettings.reminderEnabled && (
          <>
            <Text style={styles.label}>提醒间隔</Text>
            <View style={styles.optionRow}>
              {INTERVAL_OPTIONS.map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.optionBtn, localSettings.reminderInterval === m && styles.optionActive]}
                  onPress={() => handleChange('reminderInterval', m)}
                >
                  <Text style={[styles.optionText, localSettings.reminderInterval === m && styles.optionTextActive]}>
                    {m}分
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.timeRow}>
              <View style={styles.timeItem}>
                <Text style={styles.label}>勿扰开始</Text>
                <TextInput
                  style={styles.timeInput}
                  value={localSettings.quietStart}
                  onChangeText={(v) => handleChange('quietStart', v)}
                  placeholder="23:00"
                  keyboardType="numbers-and-punctuation"
                />
              </View>
              <View style={styles.timeItem}>
                <Text style={styles.label}>勿扰结束</Text>
                <TextInput
                  style={styles.timeInput}
                  value={localSettings.quietEnd}
                  onChangeText={(v) => handleChange('quietEnd', v)}
                  placeholder="07:00"
                  keyboardType="numbers-and-punctuation"
                />
              </View>
            </View>
          </>
        )}
      </View>

      {/* Data section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>数据管理</Text>
        <TouchableOpacity style={styles.dangerBtn} onPress={handleResetToday}>
          <Text style={styles.dangerText}>重置今日数据</Text>
        </TouchableOpacity>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>关于</Text>
        <Text style={styles.aboutText}>喝水 App v1.0.0</Text>
        <Text style={styles.aboutText}>保持喝水，健康生活 💧</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg, paddingTop: 50 },
  pageTitle: { fontSize: FontSize.xl, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: Spacing.xl },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: Spacing.md },
  label: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.sm, marginTop: Spacing.sm },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  optionBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: Colors.white,
  },
  optionActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  optionText: { fontSize: FontSize.sm, color: Colors.textPrimary },
  optionTextActive: { color: Colors.white, fontWeight: '600' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.md },
  timeItem: { flex: 1 },
  timeInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: Spacing.sm,
    fontSize: FontSize.sm,
    textAlign: 'center',
  },
  dangerBtn: {
    borderWidth: 1,
    borderColor: Colors.danger,
    borderRadius: 8,
    padding: Spacing.md,
    alignItems: 'center',
  },
  dangerText: { color: Colors.danger, fontSize: FontSize.sm, fontWeight: '600' },
  aboutText: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.xs },
});

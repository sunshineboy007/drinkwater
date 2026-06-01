import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useDrinkingData } from '../../hooks/useDrinkingData';
import { Colors, FontSize, Spacing } from '../../constants/theme';
import { getWeekDatesCorrect, getTodayString } from '../../utils/dateUtils';

function getPersona(weekAvg: number, goal: number): { title: string; desc: string; bg: string } {
  const pct = goal > 0 ? (weekAvg / goal) * 100 : 0;
  if (pct <= 30) return { title: '沙漠行者 🏜️', desc: '水分严重不足，沙漠在蔓延...', bg: '#FFF3E0' };
  if (pct <= 60) return { title: '绿洲探索者 🌿', desc: '绿洲初现，继续前进！', bg: '#E8F5E9' };
  if (pct <= 90) return { title: '雨林使者 🌴', desc: '雨林正在生长，再加把劲！', bg: '#E0F7FA' };
  return { title: '海洋之心 🌊', desc: '水润满分，你就是水做的！', bg: '#E3F2FD' };
}

export default function StatsScreen() {
  const { todayCups, settings, history, streak, refreshHistory } = useDrinkingData();
  const [weekData, setWeekData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    refreshHistory();
    buildWeekData();
  }, [todayCups, history]);

  function buildWeekData() {
    const weekDates = getWeekDatesCorrect();
    const today = getTodayString();
    const data = weekDates.map((date) => {
      if (date === today) return todayCups;
      const record = history.find((r) => r.date === date);
      return record ? record.cups : 0;
    });
    setWeekData(data);
  }

  const weekTotal = weekData.reduce((a, b) => a + b, 0);
  const weekAvg = weekTotal / 7;
  const persona = getPersona(weekAvg, settings.dailyGoal);
  const todayPct = settings.dailyGoal > 0 ? Math.round((todayCups / settings.dailyGoal) * 100) : 0;

  const barColors = weekData.map((cups, i) => {
    const isToday = i === (new Date().getDay() + 6) % 7;
    if (isToday) return Colors.primary;
    return cups >= settings.dailyGoal ? Colors.primary : '#B0BEC5';
  });

  const screenWidth = Dimensions.get('window').width - 32;

  const recentHistory = [...history].reverse().slice(0, 14);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Persona card */}
      <View style={[styles.personaCard, { backgroundColor: persona.bg }]}>
        <Text style={styles.personaTitle}>{persona.title}</Text>
        <Text style={styles.personaDesc}>{persona.desc}</Text>
      </View>

      {/* Stats overview */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{todayPct}%</Text>
          <Text style={styles.statLabel}>今日完成率</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{weekAvg.toFixed(1)}杯</Text>
          <Text style={styles.statLabel}>本周平均</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{streak}天 🔥</Text>
          <Text style={styles.statLabel}>连续达标</Text>
        </View>
      </View>

      {/* Weekly chart */}
      <Text style={styles.sectionTitle}>本周喝水量</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={{
            labels: ['一', '二', '三', '四', '五', '六', '日'],
            datasets: [{ data: weekData.map((v) => (v > 0 ? v : 0)) }],
          }}
          width={screenWidth}
          height={200}
          fromZero
          chartConfig={{
            backgroundColor: Colors.white,
            backgroundGradientFrom: Colors.white,
            backgroundGradientTo: Colors.white,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(74, 144, 217, ${opacity})`,
            labelColor: () => Colors.textSecondary,
            barPercentage: 0.6,
          }}
          style={styles.chart}
        />
      </View>

      {/* History */}
      <Text style={styles.sectionTitle}>最近记录</Text>
      {recentHistory.length === 0 ? (
        <Text style={styles.emptyText}>暂无历史记录</Text>
      ) : (
        recentHistory.map((record, i) => (
          <View key={i} style={styles.historyRow}>
            <Text style={styles.historyDate}>{record.date}</Text>
            <Text style={styles.historyCups}>{record.cups}杯</Text>
            <Text style={styles.historyGoal}>{record.goalMet ? '✅' : '❌'}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg, paddingTop: 50 },
  personaCard: {
    padding: Spacing.xl,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  personaTitle: { fontSize: FontSize.xl, fontWeight: 'bold', color: Colors.textPrimary },
  personaDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.lg },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statValue: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.textPrimary },
  statLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: Spacing.xs },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  chartContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.sm,
    marginBottom: Spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  chart: { borderRadius: 12 },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.xs,
  },
  historyDate: { fontSize: FontSize.sm, color: Colors.textSecondary, flex: 1 },
  historyCups: { fontSize: FontSize.sm, color: Colors.textPrimary, fontWeight: '600', marginRight: Spacing.md },
  historyGoal: { fontSize: FontSize.md },
  emptyText: { fontSize: FontSize.sm, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.xl },
});

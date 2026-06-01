import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrinkingSceneAnimation, { DrinkingSceneRef } from '../../components/DrinkingSceneAnimation';
import WaterButton from '../../components/WaterButton';
import ProgressText from '../../components/ProgressText';
import ToastMessage from '../../components/ToastMessage';
import { useDrinkingData } from '../../hooks/useDrinkingData';
import { Colors, FontSize, Spacing } from '../../constants/theme';
import { formatDateChinese } from '../../utils/dateUtils';
import { getDailyMotto, getRandomQuote, encourageQuotes } from '../../utils/quotes';

export default function HomeScreen() {
  const { todayCups, settings, drinkOneCup, loading } = useDrinkingData();
  const sceneRef = useRef<DrinkingSceneRef>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const handleDrink = useCallback(async () => {
    const newCups = await drinkOneCup();
    sceneRef.current?.triggerDrinkAnimation();

    if (newCups >= settings.dailyGoal) {
      setToastMsg('🎉 今日目标达成！你的森林完成了！');
    } else {
      setToastMsg(getRandomQuote(encourageQuotes));
    }
    setToastVisible(true);
  }, [drinkOneCup, settings.dailyGoal]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: Colors.textSecondary, fontSize: FontSize.md }}>加载中...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topArea}>
        <Text style={styles.dateText}>{formatDateChinese()}</Text>
        <Text style={styles.mottoText}>{getDailyMotto()}</Text>
      </View>

      <DrinkingSceneAnimation
        ref={sceneRef}
        current={todayCups}
        total={settings.dailyGoal}
      />

      <ProgressText
        current={todayCups}
        goal={settings.dailyGoal}
        mlPerCup={settings.mlPerCup}
      />

      <View style={styles.buttonArea}>
        <WaterButton onPress={handleDrink} />
      </View>

      <ToastMessage
        message={toastMsg}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topArea: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  dateText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  mottoText: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: 'bold',
    marginTop: Spacing.xs,
  },
  buttonArea: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
});

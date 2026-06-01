import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing } from '../constants/theme';

interface ProgressTextProps {
  current: number;
  goal: number;
  mlPerCup: number;
}

export default function ProgressText({ current, goal, mlPerCup }: ProgressTextProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.cupsText}>
        {current} / {goal} 杯
      </Text>
      <Text style={styles.mlText}>
        {current * mlPerCup} / {goal * mlPerCup} ml
      </Text>
      {current > goal && (
        <Text style={styles.extraText}>超额完成！🎉</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  cupsText: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  mlText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  extraText: {
    fontSize: FontSize.sm,
    color: Colors.success,
    marginTop: Spacing.xs,
    fontWeight: '600',
  },
});

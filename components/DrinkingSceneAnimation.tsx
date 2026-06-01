import React, { useImperativeHandle, forwardRef, useMemo } from 'react';
import { View, StyleSheet, Animated as RNAnimated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Sky from './scene/Sky';
import Ground from './scene/Ground';
import Water from './scene/Water';
import Vegetation from './scene/Vegetation';
import Effects from './scene/Effects';
import { useSceneAnimation } from '../hooks/useSceneAnimation';

interface DrinkingSceneAnimationProps {
  current: number;
  total: number;
}

export interface DrinkingSceneRef {
  triggerDrinkAnimation: () => void;
}

const AnimatedCircle = RNAnimated.createAnimatedComponent(Circle);

const DrinkingSceneAnimation = forwardRef<DrinkingSceneRef, DrinkingSceneAnimationProps>(
  ({ current, total }, ref) => {
    const { drinkRipple1, drinkRipple2, drinkRipple3, triggerDrinkAnimation } = useSceneAnimation();
    const progress = total > 0 ? Math.min(current / total, 1) : 0;

    useImperativeHandle(ref, () => ({
      triggerDrinkAnimation,
    }));

    const ripple1R = drinkRipple1.interpolate({ inputRange: [0, 1], outputRange: [15, 60] });
    const ripple1O = drinkRipple1.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] });
    const ripple2R = drinkRipple2.interpolate({ inputRange: [0, 1], outputRange: [15, 60] });
    const ripple2O = drinkRipple2.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] });
    const ripple3R = drinkRipple3.interpolate({ inputRange: [0, 1], outputRange: [15, 60] });
    const ripple3O = drinkRipple3.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0] });

    return (
      <View style={styles.container}>
        <Svg width="100%" height={280} viewBox="0 0 360 280">
          <Sky progress={progress} />
          <Ground progress={progress} />
          <Water progress={progress} />
          <Vegetation progress={progress} />
          <Effects progress={progress} />
          <AnimatedCircle cx={180} cy={250} r={ripple1R} fill="none" stroke="#42A5F5" strokeWidth={2} opacity={ripple1O} />
          <AnimatedCircle cx={180} cy={250} r={ripple2R} fill="none" stroke="#42A5F5" strokeWidth={1.5} opacity={ripple2O} />
          <AnimatedCircle cx={180} cy={250} r={ripple3R} fill="none" stroke="#42A5F5" strokeWidth={1} opacity={ripple3O} />
        </Svg>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#87CEEB',
  },
});

DrinkingSceneAnimation.displayName = 'DrinkingSceneAnimation';
export default DrinkingSceneAnimation;

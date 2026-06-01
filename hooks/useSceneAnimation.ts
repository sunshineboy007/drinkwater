import { useRef, useCallback } from 'react';
import { Animated, Easing } from 'react-native';

export function useSceneAnimation() {
  const drinkRipple1 = useRef(new Animated.Value(0)).current;
  const drinkRipple2 = useRef(new Animated.Value(0)).current;
  const drinkRipple3 = useRef(new Animated.Value(0)).current;

  const triggerDrinkAnimation = useCallback(() => {
    const ripples = [drinkRipple1, drinkRipple2, drinkRipple3];
    ripples.forEach((ripple, i) => {
      ripple.setValue(0);
      Animated.timing(ripple, {
        toValue: 1,
        duration: 800,
        delay: i * 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => {
        ripple.setValue(0);
      });
    });
  }, []);

  return {
    drinkRipple1,
    drinkRipple2,
    drinkRipple3,
    triggerDrinkAnimation,
  };
}

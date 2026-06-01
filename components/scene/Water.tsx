import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Ellipse, Path, Rect } from 'react-native-svg';

interface WaterProps {
  progress: number;
}

export default function Water({ progress }: WaterProps) {
  const rippleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    anim.start();
    return () => anim.stop();
  }, []);

  const puddleOpacity = progress > 0.2 ? Math.min(1, (progress - 0.2) * 5) : 0;
  const streamOpacity = progress > 0.4 ? Math.min(1, (progress - 0.4) * 5) : 0;
  const waterfallOpacity = progress > 0.7 ? Math.min(1, (progress - 0.7) * 5) : 0;

  if (puddleOpacity < 0.01 && streamOpacity < 0.01 && waterfallOpacity < 0.01) return null;

  return (
    <>
      {puddleOpacity > 0.01 && (
        <>
          <Ellipse cx={100} cy={240} rx={22} ry={8} fill="#64B5F6" opacity={puddleOpacity * 0.8} />
          <Ellipse cx={250} cy={250} rx={18} ry={6} fill="#64B5F6" opacity={puddleOpacity * 0.7} />
        </>
      )}

      {streamOpacity > 0.01 && (
        <Path
          d="M0,260 Q60,250 120,260 Q180,270 240,258 Q300,248 360,260 L360,268 Q300,256 240,266 Q180,278 120,268 Q60,258 0,268 Z"
          fill="#42A5F5"
          opacity={streamOpacity * 0.8}
        />
      )}

      {waterfallOpacity > 0.01 && (
        <>
          <Rect x={310} y={160} width={3} height={45} fill="white" opacity={waterfallOpacity * 0.4} rx={1} />
          <Rect x={318} y={160} width={3} height={50} fill="white" opacity={waterfallOpacity * 0.5} rx={1} />
          <Rect x={326} y={160} width={4} height={55} fill="white" opacity={waterfallOpacity * 0.55} rx={1} />
          <Rect x={334} y={160} width={3} height={48} fill="white" opacity={waterfallOpacity * 0.45} rx={1} />
          <Rect x={342} y={160} width={3} height={42} fill="white" opacity={waterfallOpacity * 0.4} rx={1} />
          <Ellipse cx={325} cy={215} rx={6} ry={3} fill="white" opacity={waterfallOpacity * 0.5} />
          <Ellipse cx={335} cy={217} rx={4} ry={2} fill="white" opacity={waterfallOpacity * 0.4} />
        </>
      )}
    </>
  );
}

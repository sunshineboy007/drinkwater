import React from 'react';
import { Ellipse, Path, Polygon } from 'react-native-svg';

interface EffectsProps {
  progress: number;
}

function Butterfly({ x, y }: { x: number; y: number }) {
  return (
    <>
      <Ellipse cx={x - 4} cy={y - 2} rx={6} ry={4} fill="#FF6B9D" opacity={0.8} />
      <Ellipse cx={x - 3} cy={y + 3} rx={5} ry={3} fill="#FFB347" opacity={0.8} />
      <Ellipse cx={x + 4} cy={y - 2} rx={6} ry={4} fill="#FF6B9D" opacity={0.8} />
      <Ellipse cx={x + 3} cy={y + 3} rx={5} ry={3} fill="#FFB347" opacity={0.8} />
      <Ellipse cx={x} cy={y} rx={1} ry={4} fill="#333" />
    </>
  );
}

function Bird({ x, y }: { x: number; y: number }) {
  return (
    <>
      <Path d={`M${x},${y} Q${x + 3},${y - 4} ${x + 6},${y}`} stroke="#1A1A2E" strokeWidth="1.5" fill="none" />
      <Path d={`M${x + 6},${y} Q${x + 9},${y - 4} ${x + 12},${y}`} stroke="#1A1A2E" strokeWidth="1.5" fill="none" />
    </>
  );
}

export default function Effects({ progress }: EffectsProps) {
  const birdOpacity = progress > 0.6 ? Math.min(1, (progress - 0.6) * 5) : 0;
  const butterflyOpacity = progress > 0.8 ? Math.min(1, (progress - 0.8) * 5) : 0;
  const sunRaysOpacity = progress >= 0.99 ? 0.2 : 0;

  return (
    <>
      {birdOpacity > 0.01 && (
        <>
          <Bird x={50} y={80} />
          <Bird x={120} y={65} />
          <Bird x={200} y={90} />
        </>
      )}

      {butterflyOpacity > 0.01 && (
        <>
          <Butterfly x={150} y={160} />
          <Butterfly x={230} y={140} />
        </>
      )}

      {sunRaysOpacity > 0.01 && (
        <>
          <Polygon points="140,100 130,200 150,200" fill="white" opacity={0.15} />
          <Polygon points="200,95 190,200 210,200" fill="white" opacity={0.2} />
          <Polygon points="260,105 248,200 272,200" fill="white" opacity={0.12} />
        </>
      )}
    </>
  );
}

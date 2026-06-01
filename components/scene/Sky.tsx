import React from 'react';
import { Rect, Ellipse, Defs, LinearGradient, Stop } from 'react-native-svg';

interface SkyProps {
  progress: number;
}

export default function Sky({ progress }: SkyProps) {
  const topColor = progress < 0.4
    ? lerpColor('#F5A623', '#87CEEB', progress / 0.4)
    : lerpColor('#87CEEB', '#4A9B6F', (progress - 0.4) / 0.6);

  const bottomColor = progress < 0.4
    ? lerpColor('#FFD98E', '#B0D4F1', progress / 0.4)
    : lerpColor('#B0D4F1', '#7BC8A4', (progress - 0.4) / 0.6);

  const sunOpacity = progress < 0.2 ? 1 - progress * 4 : Math.max(0, 1 - (progress - 0.2) * 2);
  const cloudOpacity = progress > 0.3 ? Math.min(1, (progress - 0.3) * 3) : 0;

  return (
    <>
      <Defs>
        <LinearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={topColor} />
          <Stop offset="1" stopColor={bottomColor} />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="360" height="180" fill="url(#skyGrad)" />

      {sunOpacity > 0.01 && (
        <>
          <Ellipse cx={180} cy={50} rx={50} ry={50} fill="#FFF9C4" opacity={sunOpacity * 0.1} />
          <Ellipse cx={180} cy={50} rx={40} ry={40} fill="#FFF9C4" opacity={sunOpacity * 0.2} />
          <Ellipse cx={180} cy={50} rx={30} ry={30} fill="#FFF9C4" opacity={sunOpacity * 0.6} />
        </>
      )}

      {cloudOpacity > 0.01 && (
        <>
          <Ellipse cx={80} cy={45} rx={30} ry={12} fill="white" opacity={cloudOpacity * 0.8} />
          <Ellipse cx={100} cy={40} rx={25} ry={14} fill="white" opacity={cloudOpacity * 0.9} />
          <Ellipse cx={120} cy={45} rx={28} ry={11} fill="white" opacity={cloudOpacity * 0.8} />
          <Ellipse cx={240} cy={65} rx={25} ry={10} fill="white" opacity={cloudOpacity * 0.7} />
          <Ellipse cx={260} cy={60} rx={22} ry={12} fill="white" opacity={cloudOpacity * 0.8} />
          <Ellipse cx={275} cy={65} rx={20} ry={9} fill="white" opacity={cloudOpacity * 0.7} />
        </>
      )}
    </>
  );
}

function lerpColor(a: string, b: string, t: number): string {
  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bv = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bv.toString(16).padStart(2, '0')}`;
}

import React from 'react';
import { Rect, Path, Polyline } from 'react-native-svg';

interface GroundProps {
  progress: number;
}

export default function Ground({ progress }: GroundProps) {
  const mountainColor = progress < 0.5
    ? lerpColor('#D4956A', '#9B7B5A', progress / 0.5)
    : lerpColor('#9B7B5A', '#1A6B3A', (progress - 0.5) / 0.5);

  const groundColor = progress < 0.4
    ? lerpColor('#C19A6B', '#8B7355', progress / 0.4)
    : lerpColor('#8B7355', '#2D5016', (progress - 0.4) / 0.6);

  const crackOpacity = progress < 0.25 ? 1 - progress * 3 : Math.max(0, 1 - (progress - 0.25) * 4);

  return (
    <>
      <Path
        d="M0,160 Q40,120 80,145 Q120,110 160,140 Q200,100 240,135 Q280,115 320,140 Q340,125 360,145 L360,180 L0,180 Z"
        fill={mountainColor}
      />
      <Rect x="0" y="180" width="360" height="100" fill={groundColor} />

      {crackOpacity > 0.01 && (
        <>
          <Polyline points="50,200 55,210 48,220" stroke="#8B7355" strokeWidth="1" fill="none" opacity={crackOpacity * 0.5} />
          <Polyline points="120,195 125,205 118,215 122,225" stroke="#8B7355" strokeWidth="1" fill="none" opacity={crackOpacity * 0.4} />
          <Polyline points="200,205 195,215 202,225" stroke="#8B7355" strokeWidth="1" fill="none" opacity={crackOpacity * 0.5} />
          <Polyline points="280,198 275,208 282,218 278,228" stroke="#8B7355" strokeWidth="1" fill="none" opacity={crackOpacity * 0.4} />
          <Polyline points="160,210 155,220 162,230" stroke="#8B7355" strokeWidth="1" fill="none" opacity={crackOpacity * 0.3} />
          <Polyline points="320,205 315,215 322,225" stroke="#8B7355" strokeWidth="1" fill="none" opacity={crackOpacity * 0.4} />
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

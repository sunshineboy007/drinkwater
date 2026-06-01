import React from 'react';
import { Rect, Ellipse, Polygon, Line } from 'react-native-svg';

interface VegetationProps {
  progress: number;
}

function Tree({ x, baseY, height }: { x: number; baseY: number; height: number }) {
  return (
    <>
      <Polygon
        points={`${x - 6},${baseY} ${x + 6},${baseY} ${x + 3.5},${baseY - height * 0.4} ${x - 3.5},${baseY - height * 0.4}`}
        fill="#5D4037"
      />
      <Ellipse cx={x} cy={baseY - height * 0.45} rx={28} ry={18} fill="#1B5E20" />
      <Ellipse cx={x} cy={baseY - height * 0.55} rx={22} ry={15} fill="#2E7D32" />
      <Ellipse cx={x} cy={baseY - height * 0.65} rx={16} ry={11} fill="#43A047" />
    </>
  );
}

export default function Vegetation({ progress }: VegetationProps) {
  const cactusOpacity = progress < 0.15 ? 1 - progress * 5 : Math.max(0, 1 - (progress - 0.15) * 10);
  const grassOpacity = progress > 0.1 ? Math.min(1, (progress - 0.1) * 5) : 0;
  const bushOpacity = progress > 0.25 ? Math.min(1, (progress - 0.25) * 5) : 0;
  const tree1Opacity = progress > 0.35 ? Math.min(1, (progress - 0.35) * 10) : 0;
  const tree2Opacity = progress > 0.45 ? Math.min(1, (progress - 0.45) * 10) : 0;
  const tree3Opacity = progress > 0.55 ? Math.min(1, (progress - 0.55) * 10) : 0;
  const tree4Opacity = progress > 0.65 ? Math.min(1, (progress - 0.65) * 10) : 0;

  const grassPositions = [
    { x: 30, y: 265 }, { x: 70, y: 270 }, { x: 140, y: 268 },
    { x: 200, y: 272 }, { x: 280, y: 268 }, { x: 330, y: 270 },
    { x: 50, y: 275 }, { x: 170, y: 275 }, { x: 310, y: 275 },
  ];

  return (
    <>
      {cactusOpacity > 0.01 && (
        <>
          <Rect x={170} y={130} width={12} height={55} rx={6} fill="#2D7A2D" opacity={cactusOpacity} />
          <Rect x={156} y={140} width={8} height={25} rx={4} fill="#2D7A2D" opacity={cactusOpacity} />
          <Rect x={184} y={135} width={8} height={30} rx={4} fill="#2D7A2D" opacity={cactusOpacity} />
          <Line x1={156} y1={140} x2={150} y2={135} stroke="#1B5E1B" strokeWidth="1" opacity={cactusOpacity} />
          <Line x1={156} y1={145} x2={150} y2={142} stroke="#1B5E1B" strokeWidth="1" opacity={cactusOpacity} />
          <Line x1={192} y1={135} x2={198} y2={130} stroke="#1B5E1B" strokeWidth="1" opacity={cactusOpacity} />
          <Line x1={192} y1={140} x2={198} y2={137} stroke="#1B5E1B" strokeWidth="1" opacity={cactusOpacity} />
        </>
      )}

      {grassOpacity > 0.01 && grassPositions.map((pos, i) => (
        <React.Fragment key={`grass-${i}`}>
          <Line x1={pos.x} y1={pos.y} x2={pos.x - 4} y2={pos.y - 18} stroke="#7CB342" strokeWidth="1.5" opacity={grassOpacity} />
          <Line x1={pos.x + 3} y1={pos.y} x2={pos.x + 6} y2={pos.y - 20} stroke="#4CAF50" strokeWidth="1.5" opacity={grassOpacity} />
          <Line x1={pos.x + 6} y1={pos.y} x2={pos.x + 2} y2={pos.y - 16} stroke="#7CB342" strokeWidth="1.5" opacity={grassOpacity} />
          <Line x1={pos.x - 2} y1={pos.y} x2={pos.x - 7} y2={pos.y - 15} stroke="#4CAF50" strokeWidth="1" opacity={grassOpacity} />
          <Line x1={pos.x + 8} y1={pos.y} x2={pos.x + 11} y2={pos.y - 14} stroke="#7CB342" strokeWidth="1" opacity={grassOpacity} />
        </React.Fragment>
      ))}

      {bushOpacity > 0.01 && (
        <>
          <Ellipse cx={60} cy={255} rx={22} ry={14} fill="#388E3C" opacity={bushOpacity} />
          <Ellipse cx={75} cy={252} rx={18} ry={12} fill="#43A047" opacity={bushOpacity} />
          <Ellipse cx={50} cy={258} rx={15} ry={10} fill="#2E7D32" opacity={bushOpacity} />
          <Ellipse cx={290} cy={258} rx={20} ry={13} fill="#388E3C" opacity={bushOpacity} />
          <Ellipse cx={305} cy={255} rx={16} ry={11} fill="#43A047" opacity={bushOpacity} />
        </>
      )}

      {tree1Opacity > 0.01 && <Tree x={80} baseY={270} height={90} />}
      {tree2Opacity > 0.01 && <Tree x={200} baseY={268} height={100} />}
      {tree3Opacity > 0.01 && <Tree x={140} baseY={272} height={85} />}
      {tree4Opacity > 0.01 && <Tree x={280} baseY={270} height={95} />}
    </>
  );
}

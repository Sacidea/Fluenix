import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Polygon, Line, Text as SvgText, Circle } from 'react-native-svg';

const COMP_MAP = {
  scenario: { label: 'Scenario', index: 0 },
  writing: { label: 'Writing', index: 1 },
  pronunciation: { label: 'Pronunciation', index: 2 },
  vocabulary: { label: 'Vocabulary', index: 3 },
  'error-decoding': { label: 'Error Dec.', index: 4 },
  'grammar-lab': { label: 'Grammar', index: 5 }
};

const DEFAULT_COMP = [
  { subject: 'Scenario', A: 20 },
  { subject: 'Writing', A: 20 },
  { subject: 'Pronunciation', A: 20 },
  { subject: 'Vocabulary', A: 20 },
  { subject: 'Error Dec.', A: 20 },
  { subject: 'Grammar', A: 20 }
];

import { Session } from './SessionItem';

export function CompetencyRadar({ sessions }: { sessions: Session[] }) {
  const data = [...DEFAULT_COMP];
  const scores = {
    scenario: [] as number[],
    writing: [] as number[],
    pronunciation: [] as number[],
    vocabulary: [] as number[],
    'error-decoding': [] as number[],
    'grammar-lab': [] as number[]
  };

  sessions.forEach(s => {
    if (s.type in scores && typeof s.score === 'number') {
      scores[s.type as keyof typeof scores].push(s.score);
    }
  });

  Object.entries(scores).forEach(([key, arr]) => {
    if (arr.length > 0) {
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
      const idx = COMP_MAP[key as keyof typeof COMP_MAP].index;
      data[idx].A = Math.max(20, avg);
    }
  });

  const size = Dimensions.get('window').width - 80;
  const center = size / 2;
  const radius = center - 30;

  const points = data.map((d, i) => {
    const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
    const valueRadius = (d.A / 100) * radius;
    return {
      x: center + valueRadius * Math.cos(angle),
      y: center + valueRadius * Math.sin(angle),
      labelX: center + (radius + 20) * Math.cos(angle),
      labelY: center + (radius + 20) * Math.sin(angle),
      label: d.subject
    };
  });

  const pathString = points.map(p => `${p.x},${p.y}`).join(' ');

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <View className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm items-center mb-4">
      <Text className="font-bold text-slate-800 self-start mb-4">Competency Map</Text>
      <Svg width={size} height={size}>
        {/* Grids */}
        {gridLevels.map(level => {
          const gridPoints = data.map((_, i) => {
            const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
            const r = radius * level;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(' ');
          return <Polygon key={level} points={gridPoints} stroke="#e2e8f0" strokeWidth="1" fill="none" />;
        })}
        
        {/* Axes */}
        {points.map((p, i) => {
          const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
          return (
            <Line 
              key={`axis-${i}`} 
              x1={center} y1={center} 
              x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} 
              stroke="#e2e8f0" strokeWidth="1" 
            />
          );
        })}

        {/* Radar Polygon */}
        <Polygon points={pathString} fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
        
        {/* Data Points & Labels */}
        {points.map((p, i) => (
          <React.Fragment key={`point-${i}`}>
            <Circle cx={p.x} cy={p.y} r="4" fill="#4f46e5" />
            <SvgText 
              x={p.labelX} y={p.labelY} 
              fill="#64748b" fontSize="10" 
              textAnchor="middle" alignmentBaseline="middle"
              fontWeight="bold"
            >
              {p.label}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
}

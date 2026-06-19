import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Svg, { Polygon, Line, Text as SvgText, Circle } from 'react-native-svg';
import { colors, shadow } from '../utils/theme';

import { Session } from './SessionItem';

export function CompetencyRadar({ sessions }: { sessions: Session[] }) {
  const scored = sessions.filter(s => typeof s.score === 'number');
  
  const getAvg = (type: string) => {
    const s = scored.filter(s => s.type === type);
    return s.length ? s.reduce((a, b) => a + Number(b.score), 0) / s.length : 40; // Default to 40 when no data (matches web)
  };

  const data = [
    { subject: 'Clarity', A: getAvg('scenario') },
    { subject: 'Vocabulary', A: getAvg('writing') },
    { subject: 'Grammar', A: getAvg('grammar') },
    { subject: 'Pronunciation', A: getAvg('pronunciation') },
    { subject: 'Leadership', A: getAvg('behavioral') },
    { subject: 'Listening', A: getAvg('listening') },
    { subject: 'Error Dec.', A: getAvg('error-decoding') },
  ];

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
    <View style={styles.container}>
      <Text style={styles.title}>Competency Profile</Text>
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
        <Polygon points={pathString} fill="rgba(99, 102, 241, 0.4)" stroke="#6366f1" strokeWidth="2" />
        
        {/* Data Points & Labels */}
        {points.map((p, i) => (
          <React.Fragment key={`point-${i}`}>
            <Circle cx={p.x} cy={p.y} r="4" fill="#6366f1" />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.slate200,
    ...shadow.sm,
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontWeight: '800',
    fontSize: 14,
    color: colors.slate800,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
});

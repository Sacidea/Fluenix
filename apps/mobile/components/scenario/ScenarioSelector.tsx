import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { ScenarioType, scenarios } from '@fluenix/shared';
import { colors, shadow } from '../../utils/theme';

interface Props {
  scenario: ScenarioType;
  setScenario: (sc: ScenarioType) => void;
  startScenario: () => void;
  loading: boolean;
}

const iconMap: Record<string, any> = {
  Terminal: Icons.Terminal,
  Users: Icons.Users,
  FileCode: Icons.FileCode,
};

export function ScenarioSelector({ scenario, setScenario, startScenario, loading }: Props) {
  const handleCardClick = (id: ScenarioType) => {
    setScenario(id);
    setTimeout(() => {
      startScenario();
    }, 50);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Select Operational Context</Text>
          <Text style={styles.headerDesc}>Click on a scenario below to immediately initialize the AI simulation.</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.voiceLabel}>AI Voice Persona</Text>
          <View style={styles.voiceBadge}>
            <Text style={styles.voiceText}>System Default</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardList}>
        {scenarios.map((s) => {
          const Icon = iconMap[s.icon] || Icons.Terminal;
          const isSelected = scenario === s.id;

          return (
            <TouchableOpacity
              key={s.id}
              disabled={loading}
              onPress={() => handleCardClick(s.id as ScenarioType)}
              style={[
                styles.card,
                isSelected ? styles.cardSelected : styles.cardDefault,
              ]}
            >
              <View style={[styles.cardAccent, { backgroundColor: s.color }]} />
              
              <View style={[styles.iconBox, { backgroundColor: `${s.color}15` }]}>
                <Icon size={24} color={s.color} />
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardTitle}>{s.label}</Text>
                  <Text style={styles.cardId}>{s.id.replace('_', ' ')}</Text>
                </View>
                <Text style={styles.cardDesc}>{s.desc}</Text>
              </View>

              {loading && isSelected && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator color={s.color} size="large" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.slate800,
    fontFamily: 'serif',
    marginBottom: 8,
  },
  headerDesc: {
    color: colors.slate500,
    fontSize: 12,
    lineHeight: 20,
  },
  headerRight: {
    alignItems: 'flex-end',
    minWidth: 100,
  },
  voiceLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 6,
  },
  voiceBadge: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  voiceText: {
    fontSize: 10,
    color: colors.slate600,
    fontWeight: '500',
  },
  cardList: {
    paddingBottom: 48,
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    ...shadow.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
  },
  cardSelected: {
    borderColor: '#6366f1',
  },
  cardDefault: {
    borderColor: colors.slate200,
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 4,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.slate800,
    fontFamily: 'serif',
  },
  cardId: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: colors.slate500,
    lineHeight: 20,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    zIndex: 10,
  },
});

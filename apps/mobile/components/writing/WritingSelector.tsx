import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { WritingExerciseId, writingExercises } from '@fluenix/shared';
import { colors, shadow } from '../../utils/theme';

interface Props {
  changeExercise: (id: WritingExerciseId) => void;
}

const iconMap: Record<string, any> = {
  GitPullRequest: Icons.GitPullRequest,
  GitCommit: Icons.GitCommit,
  Mail: Icons.Mail,
};

export function WritingSelector({ changeExercise }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Select an Operation</Text>
        <Text style={styles.subtitle}>
          Choose a technical writing scenario to calibrate your FAANG-level communication skills.
        </Text>
      </View>

      <View style={styles.listContainer}>
        {writingExercises.map((ex) => {
          const Icon = iconMap[ex.icon] || Icons.FileText;

          return (
            <TouchableOpacity
              key={ex.id}
              onPress={() => changeExercise(ex.id)}
              style={styles.card}
            >
              <View style={[styles.cardStrip, { backgroundColor: ex.color }]} />
              
              <View style={[styles.iconContainer, { backgroundColor: ex.bg }]}>
                <Icon size={26} color={ex.color} />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{ex.label}</Text>
                <Text style={styles.cardDesc}>{ex.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.slate800,
    fontFamily: 'serif',
    marginBottom: 12,
  },
  subtitle: {
    color: colors.slate500,
    textAlign: 'center',
    lineHeight: 22,
  },
  listContainer: {
    paddingBottom: 48,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardStrip: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 6,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.slate800,
    fontFamily: 'serif',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: colors.slate500,
    lineHeight: 22,
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { FlashcardWorkspace } from '../../../components/vocabulary/FlashcardWorkspace';
import { colors } from '../../../utils/theme';

export default function VocabularyLabScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.replace('/dashboard')} 
          style={styles.backButton}
        >
          <Icons.ChevronLeft size={16} color="#64748b" />
          <Text style={styles.backButtonText}>Return to Dashboard</Text>
        </TouchableOpacity>
        
        <View style={styles.subtitleContainer}>
          <View style={styles.subtitleLine} />
          <Text style={styles.subtitleText}>Language Lab</Text>
        </View>
        <Text style={styles.title}>Tech Lexicon</Text>
        <Text style={styles.description}>
          Advanced terminology tailored for FAANG communications.
        </Text>
      </View>

      {/* WORKSPACE */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}>
        <FlashcardWorkspace />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    color: colors.slate500,
    fontWeight: '700',
    marginLeft: 4,
    fontSize: 14,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  subtitleLine: {
    width: 24,
    height: 1,
    backgroundColor: colors.purple500,
  },
  subtitleText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: colors.slate400,
  },
  title: {
    fontWeight: '900',
    fontSize: 30,
    color: colors.slate800,
    marginBottom: 4,
  },
  description: {
    color: colors.slate500,
    fontSize: 14,
    lineHeight: 22,
  },
});

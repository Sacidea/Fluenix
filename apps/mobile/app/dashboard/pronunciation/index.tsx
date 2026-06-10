import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { usePronunciationSession } from '../../../hooks/usePronunciationSession';
import { WordIndexSidebar } from '../../../components/pronunciation/WordIndexSidebar';
import { AnalysisWorkspace } from '../../../components/pronunciation/AnalysisWorkspace';
import { colors } from '../../../utils/theme';

export default function PronunciationLabScreen() {
  const session = usePronunciationSession();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Global Header Area */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Icons.ChevronLeft size={16} color="#64748b" />
          <Text style={styles.backText}>Return to Dashboard</Text>
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <View>
            <View style={styles.labelRow}>
              <View style={styles.labelAccent} />
              <Text style={styles.labelText}>Acoustic Analysis Lab</Text>
            </View>
            <Text style={styles.title}>Pronunciation Lab</Text>
          </View>
        </View>
      </View>
      <WordIndexSidebar 
        paginatedWords={session.paginatedWords}
        allWords={session.words}
        categories={session.categories}
        selectedCategory={session.selectedCategory}
        setSelectedCategory={session.setSelectedCategory}
        currentPage={session.currentPage}
        totalPages={session.totalPages}
        setCurrentPage={session.setCurrentPage}
        currentIndex={session.currentIndex}
        setWordByIndex={session.setWordByIndex}
        onGenerateWords={session.generateWords}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <AnalysisWorkspace 
          supported={session.supported}
          currentWord={session.currentWord}
          listening={session.listening}
          transcript={session.transcript}
          result={session.result}
          loading={session.loading}
          startListening={session.startListening}
          stopListening={session.stopListening}
          speakWord={session.speakWord}
          nextWord={session.nextWord}
        />
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
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    color: colors.slate500,
    fontWeight: '700',
    marginLeft: 4,
    fontSize: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  labelAccent: {
    width: 24,
    height: 1,
    backgroundColor: '#6366f1',
  },
  labelText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: colors.slate400,
  },
  title: {
    fontWeight: '900',
    fontSize: 24,
    color: colors.slate800,
  },
  scrollView: {
    flex: 1,
  },
});

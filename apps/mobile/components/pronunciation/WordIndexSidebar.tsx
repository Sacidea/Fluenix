import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { Word } from '../../hooks/usePronunciationSession';
import { colors, shadow } from '../../utils/theme';

interface WordIndexSidebarProps {
  paginatedWords: Word[];
  allWords: Word[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  currentIndex: number;
  setWordByIndex: (index: number) => void;
  onGenerateWords?: (topic: string) => void;
}

export function WordIndexSidebar({
  paginatedWords,
  allWords,
  categories,
  selectedCategory,
  setSelectedCategory,
  currentPage,
  totalPages,
  setCurrentPage,
  currentIndex,
  setWordByIndex,
  onGenerateWords
}: WordIndexSidebarProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [topic, setTopic] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Icons.List size={16} color={colors.slate500} />
          <Text style={styles.headerTitle}>TERMINOLOGY INDEX</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          style={styles.generateBtn}
        >
          <Icons.Sparkles size={12} color={colors.blue500} />
          <Text style={styles.generateBtnText}>Generate</Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <View style={styles.categoryRow}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                style={[styles.categoryTab, isSelected ? styles.categoryTabSelected : styles.categoryTabDefault]}
              >
                <Text style={[styles.categoryTabText, isSelected ? styles.categoryTabTextSelected : styles.categoryTabTextDefault]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Word List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.wordScroll}>
        <View style={styles.wordRow}>
          {paginatedWords.map((w) => {
            const globalIndex = allWords.findIndex((aw) => aw.id === w.id);
            const isActive = currentIndex === globalIndex;
            return (
              <TouchableOpacity
                key={w.id}
                onPress={() => setWordByIndex(globalIndex)}
                style={[styles.wordCard, isActive ? styles.wordCardActive : styles.wordCardDefault]}
              >
                <Text style={[styles.wordCardIndex, isActive ? styles.wordCardIndexActive : styles.wordCardIndexDefault]}>
                  {String(globalIndex + 1).padStart(2, '0')}
                </Text>
                <Text style={[styles.wordCardText, isActive ? styles.wordCardTextActive : styles.wordCardTextDefault]}>
                  {w.word}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Pagination */}
      {totalPages > 1 && (
        <View style={styles.paginationRow}>
          <TouchableOpacity
            disabled={currentPage === 1}
            onPress={() => setCurrentPage(currentPage - 1)}
            style={[styles.pageBtn, currentPage === 1 && styles.pageBtnDisabled]}
          >
            <Text style={styles.pageBtnText}>PREV</Text>
          </TouchableOpacity>

          <Text style={styles.pageIndicator}>
            PAGE {currentPage} / {totalPages}
          </Text>

          <TouchableOpacity
            disabled={currentPage === totalPages}
            onPress={() => setCurrentPage(currentPage + 1)}
            style={[styles.pageBtn, currentPage === totalPages && styles.pageBtnDisabled]}
          >
            <Text style={styles.pageBtnText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Generate Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Icons.Sparkles size={20} color={colors.blue500} />
              <Text style={styles.modalTitle}>Generate New Words</Text>
            </View>
            <Text style={styles.modalDesc}>
              Enter a technical topic (e.g. AWS, React Hooks, Security) and the AI will generate new vocabulary for you to practice.
            </Text>
            
            <TextInput
              value={topic}
              onChangeText={setTopic}
              placeholder="e.g. System Design"
              placeholderTextColor={colors.slate400}
              style={styles.modalInput}
              autoFocus
            />
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.modalCancelBtn}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  if (topic.trim() && onGenerateWords) {
                    onGenerateWords(topic.trim());
                    setModalVisible(false);
                    setTopic('');
                  }
                }}
                style={styles.modalSubmitBtn}
              >
                <Text style={styles.modalSubmitText}>Generate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate100,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate500,
    marginLeft: 8,
    letterSpacing: 2,
  },
  generateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  generateBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563eb',
    marginLeft: 4,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate100,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 32,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  categoryTabSelected: {
    backgroundColor: '#2563eb',
  },
  categoryTabDefault: {
    backgroundColor: colors.slate100,
  },
  categoryTabText: {
    fontSize: 10,
    fontWeight: '700',
  },
  categoryTabTextSelected: {
    color: colors.white,
  },
  categoryTabTextDefault: {
    color: colors.slate600,
  },
  wordScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  wordRow: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 32,
  },
  wordCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  wordCardActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  wordCardDefault: {
    backgroundColor: colors.white,
    borderColor: colors.slate200,
  },
  wordCardIndex: {
    fontSize: 10,
    fontWeight: '900',
    marginBottom: 4,
  },
  wordCardIndexActive: {
    color: colors.blue500,
  },
  wordCardIndexDefault: {
    color: colors.slate400,
  },
  wordCardText: {
    fontSize: 12,
    fontWeight: '700',
  },
  wordCardTextActive: {
    color: '#1e3a8a',
  },
  wordCardTextDefault: {
    color: colors.slate700,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.slate100,
  },
  pageBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
  },
  pageBtnDisabled: {
    opacity: 0.5,
  },
  pageBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate600,
  },
  pageIndicator: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.slate500,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 16,
    padding: 24,
    ...shadow.md,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.slate800,
    marginLeft: 8,
  },
  modalDesc: {
    fontSize: 12,
    color: colors.slate500,
    marginBottom: 16,
    lineHeight: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.slate800,
    marginBottom: 24,
    backgroundColor: colors.slate50,
    fontWeight: '500',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalCancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalCancelText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slate500,
  },
  modalSubmitBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
  },
  modalSubmitText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});

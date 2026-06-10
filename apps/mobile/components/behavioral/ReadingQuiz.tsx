import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Icons from 'lucide-react-native';
import { VocabularyWord, FillInBlankExercise, ScenarioExercise } from '@fluenix/shared';
import { colors, shadow } from '../../utils/theme';

interface ReadingQuizProps {
  vocabulary?: VocabularyWord[];
  fillInBlank?: FillInBlankExercise;
  scenario?: ScenarioExercise;
}

export function ReadingQuiz({ vocabulary, fillInBlank, scenario }: ReadingQuizProps) {
  // State for Fill in the Blanks
  const [blankAnswers, setBlankAnswers] = useState<Record<number, string>>({});
  const [blankChecked, setBlankChecked] = useState(false);

  // State for Scenario
  const [scenarioAnswer, setScenarioAnswer] = useState<number | null>(null);

  const handleBlankChange = (index: number, value: string) => {
    setBlankAnswers(prev => ({ ...prev, [index]: value }));
  };

  const checkBlanks = () => {
    setBlankChecked(true);
  };

  const handleScenarioSelect = (index: number) => {
    if (scenarioAnswer === null) {
      setScenarioAnswer(index);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* 1. Vocabulary Section */}
      {vocabulary && vocabulary.length > 0 && (
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Icons.BookA size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Key Vocabulary</Text>
          </View>
          <View style={styles.vocabList}>
            {vocabulary.map((v, i) => (
              <View key={i} style={styles.vocabCard}>
                <Text style={styles.vocabWord}>{v.word}</Text>
                <Text style={styles.vocabMeaning}>{v.meaning}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 2. Fill in the Blanks Section */}
      {fillInBlank && (
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Icons.Edit3 size={20} color="#9333ea" />
            <Text style={styles.sectionTitle}>Grammar & Context</Text>
          </View>
          <View style={[styles.fillInCard, shadow.sm]}>
            <View style={styles.fillInTextWrap}>
              {fillInBlank.sentenceParts.map((part, index) => {
                const isLastPart = index === fillInBlank.sentenceParts.length - 1;
                const correctWord = fillInBlank.missingWords[index];
                const userWord = blankAnswers[index] || '';
                const isCorrect = userWord === correctWord;
                
                return (
                  <React.Fragment key={index}>
                    <Text style={styles.fillInPartText}>{part}</Text>
                    {!isLastPart && (
                      <View 
                        style={[
                          styles.pickerContainer,
                          blankChecked 
                            ? (isCorrect ? styles.pickerCorrect : styles.pickerIncorrect) 
                            : styles.pickerDefault,
                        ]}
                      >
                        <Picker
                          selectedValue={userWord}
                          onValueChange={(itemValue) => handleBlankChange(index, itemValue)}
                          enabled={!(blankChecked && isCorrect)}
                          style={{ height: 36, color: blankChecked ? (isCorrect ? '#166534' : '#991b1b') : '#0f172a' }}
                          itemStyle={{ fontSize: 14 }}
                        >
                          <Picker.Item label="---" value="" color="#94a3b8" />
                          {fillInBlank.wordBank.map((w, wIndex) => (
                            <Picker.Item key={wIndex} label={w} value={w} />
                          ))}
                        </Picker>
                      </View>
                    )}
                  </React.Fragment>
                );
              })}
            </View>
            
            <View style={styles.checkAnswersRow}>
              <TouchableOpacity 
                onPress={checkBlanks}
                style={[styles.checkAnswersBtn, shadow.sm]}
              >
                <Text style={styles.checkAnswersBtnText}>Check Answers</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* 3. Scenario Section */}
      {scenario && (
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Icons.MessageSquare size={20} color="#ea580c" />
            <Text style={styles.sectionTitle}>Interview Scenario</Text>
          </View>

          <View style={[styles.scenarioCard, shadow.sm]}>
            <Text style={styles.scenarioQuestion}>
              {scenario.scenario}
            </Text>
            
            <View style={styles.optionsList}>
              {scenario.options.map((opt, optIndex) => {
                const hasAnswered = scenarioAnswer !== null;
                const isCorrectAnswer = optIndex === scenario.answerIndex;
                const isSelected = optIndex === scenarioAnswer;
                
                let containerStyle: any = styles.optionDefault;
                let textStyle: any = styles.optionTextDefault;
                let extraStyle: any = {};
                
                if (hasAnswered) {
                  if (isCorrectAnswer) {
                    containerStyle = styles.optionCorrect;
                    textStyle = styles.optionTextCorrect;
                  } else if (isSelected) {
                    containerStyle = styles.optionIncorrect;
                    textStyle = styles.optionTextIncorrect;
                  } else {
                    containerStyle = styles.optionDimmed;
                    extraStyle = { opacity: 0.5 };
                  }
                }

                return (
                  <TouchableOpacity
                    key={optIndex}
                    onPress={() => handleScenarioSelect(optIndex)}
                    disabled={hasAnswered}
                    style={[styles.optionBase, containerStyle, extraStyle]}
                  >
                    <Text style={[styles.optionTextBase, textStyle]}>{opt}</Text>
                    {hasAnswered && isCorrectAnswer && <Icons.CheckCircle2 size={20} color="#22c55e" style={{ marginLeft: 8 }} />}
                    {hasAnswered && isSelected && !isCorrectAnswer && <Icons.XCircle size={20} color="#ef4444" style={{ marginLeft: 8 }} />}
                  </TouchableOpacity>
                );
              })}
            </View>

            {scenarioAnswer !== null && (
              <View style={[
                styles.explanationBox,
                scenarioAnswer === scenario.answerIndex ? styles.explanationCorrect : styles.explanationIncorrect,
              ]}>
                <Text style={[
                  styles.explanationText,
                  scenarioAnswer === scenario.answerIndex ? styles.explanationTextCorrect : styles.explanationTextIncorrect,
                ]}>
                  <Text style={styles.boldInline}>Why this is {scenarioAnswer === scenario.answerIndex ? 'Correct' : 'Incorrect'}: </Text>
                  {scenario.explanation}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    borderTopColor: colors.slate200,
    paddingTop: 32,
  },
  sectionContainer: {
    marginBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.slate800,
  },
  // Vocabulary
  vocabList: {
    gap: 12,
  },
  vocabCard: {
    backgroundColor: colors.slate50,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  vocabWord: {
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 4,
  },
  vocabMeaning: {
    color: colors.slate600,
    fontSize: 12,
    lineHeight: 20,
  },
  // Fill in the Blanks
  fillInCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  fillInTextWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  fillInPartText: {
    fontSize: 14,
    color: colors.slate700,
    lineHeight: 32,
    marginRight: 4,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: colors.slate50,
    marginBottom: 8,
    overflow: 'hidden',
    minWidth: 100,
    height: 36,
    justifyContent: 'center',
  },
  pickerDefault: {
    borderColor: colors.slate300,
  },
  pickerCorrect: {
    borderColor: colors.green500,
    backgroundColor: '#f0fdf4',
  },
  pickerIncorrect: {
    borderColor: colors.red500,
    backgroundColor: '#fef2f2',
  },
  checkAnswersRow: {
    marginTop: 24,
    alignItems: 'flex-end',
  },
  checkAnswersBtn: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  checkAnswersBtnText: {
    color: colors.white,
    fontWeight: '700',
  },
  // Scenario
  scenarioCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  scenarioQuestion: {
    fontWeight: '700',
    fontSize: 14,
    color: colors.slate800,
    marginBottom: 20,
    lineHeight: 22,
  },
  optionsList: {
    gap: 12,
  },
  optionBase: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionDefault: {
    backgroundColor: colors.white,
    borderColor: colors.slate200,
  },
  optionCorrect: {
    backgroundColor: '#f0fdf4',
    borderColor: colors.green500,
  },
  optionIncorrect: {
    backgroundColor: '#fef2f2',
    borderColor: colors.red500,
  },
  optionDimmed: {
    backgroundColor: colors.white,
    borderColor: colors.slate100,
  },
  optionTextBase: {
    flex: 1,
    fontSize: 12,
    lineHeight: 20,
  },
  optionTextDefault: {
    color: colors.slate700,
  },
  optionTextCorrect: {
    color: '#166534',
    fontWeight: '700',
  },
  optionTextIncorrect: {
    color: '#991b1b',
    fontWeight: '700',
  },
  explanationBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  explanationCorrect: {
    backgroundColor: '#f0fdf4',
    borderLeftColor: colors.green500,
  },
  explanationIncorrect: {
    backgroundColor: '#fef2f2',
    borderLeftColor: colors.red500,
  },
  explanationText: {
    fontSize: 12,
    lineHeight: 20,
  },
  explanationTextCorrect: {
    color: '#166534',
  },
  explanationTextIncorrect: {
    color: '#991b1b',
  },
  boldInline: {
    fontWeight: '700',
  },
});

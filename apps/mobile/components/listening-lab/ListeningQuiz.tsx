import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import type { ListeningScenario } from '@fluenix/shared';
import { colors, shadow } from '../../utils/theme';

type QuestionOption = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
};

interface Props {
  scenario: ListeningScenario;
  currentQuestionIdx: number;
  selectedOptionId: string | null;
  isAnswered: boolean;
  onOptionSelect: (id: string) => void;
  onNextQuestion: () => void;
}

export function ListeningQuiz({ scenario, currentQuestionIdx, selectedOptionId, isAnswered, onOptionSelect, onNextQuestion }: Props) {
  const currentQuestion = scenario.questions ? (scenario.questions as unknown[])[currentQuestionIdx] as any : null;

  if (!currentQuestion) return null;

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
        <Text style={styles.questionCount}>Q {currentQuestionIdx + 1}/{(scenario.questions as unknown[]).length}</Text>
      </View>
      
      <View style={styles.optionsList}>
        {(currentQuestion.options as unknown[]).map((optUnknown: unknown) => {
          const opt = optUnknown as QuestionOption;
          const isSelected = selectedOptionId === opt.id;
          
          let containerStyle: any = styles.optionContainer;
          let textStyle: any = styles.optionText;

          if (isAnswered) {
            if (opt.isCorrect) {
              containerStyle = styles.optionCorrect;
              textStyle = styles.optionTextCorrect;
            } else if (isSelected) {
              containerStyle = styles.optionIncorrect;
              textStyle = styles.optionTextIncorrect;
            }
          } else if (isSelected) {
            containerStyle = styles.optionSelected;
          }

          return (
            <TouchableOpacity
              key={opt.id}
              style={[styles.optionBase, containerStyle]}
              onPress={() => onOptionSelect(opt.id)}
              disabled={isAnswered}
            >
              <Text style={[styles.optionTextBase, textStyle]}>{opt.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {isAnswered && (
        <View style={styles.feedbackContainer}>
          {(currentQuestion.options as QuestionOption[]).find(o => o.id === selectedOptionId)?.isCorrect ? (
            <View style={[styles.feedbackBox, styles.feedbackBoxCorrect]}>
              <View style={styles.feedbackHeader}>
                <Icons.CheckCircle2 size={18} color={colors.emerald500} />
                <Text style={styles.feedbackTitleCorrect}>Correct!</Text>
              </View>
              <Text style={styles.feedbackExplanation}>
                {(currentQuestion.options as QuestionOption[]).find(o => o.id === selectedOptionId)?.explanation}
              </Text>
            </View>
          ) : (
            <View style={[styles.feedbackBox, styles.feedbackBoxIncorrect]}>
              <View style={styles.feedbackHeader}>
                <Icons.XCircle size={18} color={colors.rose500} />
                <Text style={styles.feedbackTitleIncorrect}>Incorrect</Text>
              </View>
              <Text style={styles.feedbackExplanation}>
                {(currentQuestion.options as QuestionOption[]).find(o => o.id === selectedOptionId)?.explanation}
              </Text>
            </View>
          )}

          <TouchableOpacity 
            style={[styles.nextButton, currentQuestionIdx === (scenario.questions as unknown[]).length - 1 && { backgroundColor: '#0891b2' }]}
            onPress={onNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIdx < (scenario.questions as unknown[]).length - 1 ? 'Next Question' : 'Start Next AI Scenario'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.slate800,
    flex: 1,
    paddingRight: 16,
    lineHeight: 24,
  },
  questionCount: {
    fontWeight: '700',
    color: colors.cyan500,
    fontSize: 12,
    marginTop: 4,
  },
  optionsList: {
    gap: 12,
  },
  optionBase: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  optionContainer: {
    backgroundColor: colors.white,
    borderColor: colors.slate200,
  },
  optionSelected: {
    backgroundColor: '#ecfeff',
    borderColor: colors.cyan500,
  },
  optionCorrect: {
    backgroundColor: '#ecfdf5',
    borderColor: colors.emerald500,
  },
  optionIncorrect: {
    backgroundColor: '#fff1f2',
    borderColor: colors.rose500,
  },
  optionTextBase: {
    fontWeight: '700',
  },
  optionText: {
    color: colors.slate600,
  },
  optionTextCorrect: {
    color: '#065f46',
  },
  optionTextIncorrect: {
    color: '#9f1239',
  },
  feedbackContainer: {
    marginTop: 24,
  },
  feedbackBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  feedbackBoxCorrect: {
    backgroundColor: '#ecfdf5',
    borderColor: '#a7f3d0',
  },
  feedbackBoxIncorrect: {
    backgroundColor: '#fff1f2',
    borderColor: '#fecdd3',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  feedbackTitleCorrect: {
    fontWeight: '700',
    color: '#065f46',
  },
  feedbackTitleIncorrect: {
    fontWeight: '700',
    color: '#9f1239',
  },
  feedbackExplanation: {
    color: colors.slate600,
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: colors.cyan500,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    ...shadow.sm,
  },
  nextButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
});

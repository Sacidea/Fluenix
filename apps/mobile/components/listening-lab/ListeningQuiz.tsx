import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Icons from 'lucide-react-native';
import { ListeningScenario } from '../../hooks/useListeningSession';

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
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg font-black text-slate-800 flex-1 pr-4 leading-tight">{currentQuestion.text}</Text>
        <Text className="font-bold text-cyan-600 text-xs mt-1">Q {currentQuestionIdx + 1}/{(scenario.questions as unknown[]).length}</Text>
      </View>
      
      <View className="flex-col gap-3">
        {(currentQuestion.options as unknown[]).map((optUnknown: unknown) => {
          const opt = optUnknown as QuestionOption;
          const isSelected = selectedOptionId === opt.id;
          let bgColor = 'bg-white';
          let borderColor = 'border-slate-200';
          let textColor = 'text-slate-600';

          if (isAnswered) {
            if (opt.isCorrect) {
              bgColor = 'bg-emerald-50';
              borderColor = 'border-emerald-500';
              textColor = 'text-emerald-800';
            } else if (isSelected) {
              bgColor = 'bg-rose-50';
              borderColor = 'border-rose-500';
              textColor = 'text-rose-800';
            }
          } else if (isSelected) {
            borderColor = 'border-cyan-500';
            bgColor = 'bg-cyan-50';
          }

          return (
            <TouchableOpacity
              key={opt.id}
              className={`p-4 rounded-xl border-2 ${bgColor} ${borderColor}`}
              onPress={() => onOptionSelect(opt.id)}
              disabled={isAnswered}
            >
              <Text className={`font-bold ${textColor}`}>{opt.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {isAnswered && (
        <View className="mt-6">
          {(currentQuestion.options as QuestionOption[]).find(o => o.id === selectedOptionId)?.isCorrect ? (
            <View className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl mb-4">
              <View className="flex-row items-center gap-2 mb-1">
                <Icons.CheckCircle2 size={18} color="#10b981" />
                <Text className="font-bold text-emerald-800">Correct!</Text>
              </View>
              <Text className="text-slate-600 text-sm">
                {(currentQuestion.options as QuestionOption[]).find(o => o.id === selectedOptionId)?.explanation}
              </Text>
            </View>
          ) : (
            <View className="bg-rose-50 border border-rose-200 p-4 rounded-xl mb-4">
              <View className="flex-row items-center gap-2 mb-1">
                <Icons.XCircle size={18} color="#e11d48" />
                <Text className="font-bold text-rose-800">Incorrect</Text>
              </View>
              <Text className="text-slate-600 text-sm">
                {(currentQuestion.options as QuestionOption[]).find(o => o.id === selectedOptionId)?.explanation}
              </Text>
            </View>
          )}

          {currentQuestionIdx < (scenario.questions as unknown[]).length - 1 && (
            <TouchableOpacity 
              className="bg-cyan-600 py-3.5 rounded-xl items-center shadow-sm"
              onPress={onNextQuestion}
            >
              <Text className="text-white font-bold">Next Question</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

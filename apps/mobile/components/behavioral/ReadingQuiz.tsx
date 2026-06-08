import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Icons from 'lucide-react-native';
import { VocabularyWord, FillInBlankExercise, ScenarioExercise } from '@fluenix/shared';

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
    <View className="mt-8 border-t-2 border-dashed border-slate-200 pt-8">
      
      {/* 1. Vocabulary Section */}
      {vocabulary && vocabulary.length > 0 && (
        <View className="mb-10">
          <View className="flex-row items-center gap-2 mb-4">
            <Icons.BookA size={20} color="#2563eb" />
            <Text className="text-lg font-black text-slate-800">Key Vocabulary</Text>
          </View>
          <View className="gap-3">
            {vocabulary.map((v, i) => (
              <View key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Text className="font-bold text-blue-800 mb-1">{v.word}</Text>
                <Text className="text-slate-600 text-sm leading-relaxed">{v.meaning}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 2. Fill in the Blanks Section */}
      {fillInBlank && (
        <View className="mb-10">
          <View className="flex-row items-center gap-2 mb-4">
            <Icons.Edit3 size={20} color="#9333ea" />
            <Text className="text-lg font-black text-slate-800">Grammar & Context</Text>
          </View>
          <View className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <View className="flex-row flex-wrap items-center">
              {fillInBlank.sentenceParts.map((part, index) => {
                const isLastPart = index === fillInBlank.sentenceParts.length - 1;
                const correctWord = fillInBlank.missingWords[index];
                const userWord = blankAnswers[index] || '';
                const isCorrect = userWord === correctWord;
                
                return (
                  <React.Fragment key={index}>
                    <Text className="text-base text-slate-700 leading-8 mr-1 mb-2">{part}</Text>
                    {!isLastPart && (
                      <View 
                        className={`border-2 rounded-lg bg-slate-50 mb-2 overflow-hidden ${
                          blankChecked 
                            ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') 
                            : 'border-slate-300'
                        }`}
                        style={{ minWidth: 100, height: 36, justifyContent: 'center' }}
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
            
            <View className="mt-6 items-end">
              <TouchableOpacity 
                onPress={checkBlanks}
                className="bg-blue-500 px-5 py-3 rounded-xl shadow-sm"
              >
                <Text className="text-white font-bold">Check Answers</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* 3. Scenario Section */}
      {scenario && (
        <View className="mb-10">
          <View className="flex-row items-center gap-2 mb-4">
            <Icons.MessageSquare size={20} color="#ea580c" />
            <Text className="text-lg font-black text-slate-800">Interview Scenario</Text>
          </View>

          <View className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <Text className="font-bold text-base text-slate-800 mb-5 leading-relaxed">
              {scenario.scenario}
            </Text>
            
            <View className="gap-3">
              {scenario.options.map((opt, optIndex) => {
                const hasAnswered = scenarioAnswer !== null;
                const isCorrectAnswer = optIndex === scenario.answerIndex;
                const isSelected = optIndex === scenarioAnswer;
                
                let containerClass = "bg-white border-slate-200";
                let textClass = "text-slate-700";
                
                if (hasAnswered) {
                  if (isCorrectAnswer) {
                    containerClass = "bg-green-50 border-green-500";
                    textClass = "text-green-800 font-bold";
                  } else if (isSelected) {
                    containerClass = "bg-red-50 border-red-500";
                    textClass = "text-red-800 font-bold";
                  } else {
                    containerClass = "bg-white border-slate-100 opacity-50";
                  }
                }

                return (
                  <TouchableOpacity
                    key={optIndex}
                    onPress={() => handleScenarioSelect(optIndex)}
                    disabled={hasAnswered}
                    className={`p-4 rounded-xl border-[1.5px] flex-row items-center justify-between ${containerClass}`}
                  >
                    <Text className={`flex-1 text-sm leading-relaxed ${textClass}`}>{opt}</Text>
                    {hasAnswered && isCorrectAnswer && <Icons.CheckCircle2 size={20} color="#22c55e" className="ml-2" />}
                    {hasAnswered && isSelected && !isCorrectAnswer && <Icons.XCircle size={20} color="#ef4444" className="ml-2" />}
                  </TouchableOpacity>
                );
              })}
            </View>

            {scenarioAnswer !== null && (
              <View className={`mt-5 p-4 rounded-xl border-l-4 ${scenarioAnswer === scenario.answerIndex ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <Text className={`text-sm leading-relaxed ${scenarioAnswer === scenario.answerIndex ? 'text-green-800' : 'text-red-800'}`}>
                  <Text className="font-bold">Why this is {scenarioAnswer === scenario.answerIndex ? 'Correct' : 'Incorrect'}: </Text>
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

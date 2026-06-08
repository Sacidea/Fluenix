import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { useBehavioralSession } from '../../hooks/useBehavioralSession';

export function BehavioralWorkspace() {
  const {
    activeQuestion,
    isLoadingQuestion,
    loadNextQuestion,
    situation, setSituation,
    task, setTask,
    action, setAction,
    result, setResult,
    isAnalyzing,
    feedback,
    error,
    analyzeAnswer
  } = useBehavioralSession();

  const [activeTab, setActiveTab] = useState<'S'|'T'|'A'|'R'>('S');

  if (isLoadingQuestion) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text className="mt-4 text-slate-500 font-medium">Loading interview question...</Text>
      </View>
    );
  }

  if (!activeQuestion) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <Text className="text-slate-500 font-medium">No question available.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      className="bg-slate-50" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={{ flex: 1 }} className="bg-slate-50" contentContainerClassName="px-4 pt-6 pb-20">
        
        {/* Question Header */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-2">
            <View className="bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
              <Text className="text-xs font-bold text-sky-800">{activeQuestion.category}</Text>
            </View>
          </View>
          <Text className="text-xl font-black text-slate-800 font-serif leading-relaxed">
            {activeQuestion.question}
          </Text>
          <Text className="text-slate-500 text-sm mt-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm leading-relaxed">
            <Text className="font-bold text-slate-700">Context:</Text> {activeQuestion.context}
          </Text>
        </View>

        {error && (
          <View className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6 flex-row items-center gap-3">
            <Icons.AlertCircle size={20} color="#dc2626" />
            <Text className="flex-1 text-red-800 font-medium">{error}</Text>
          </View>
        )}

        {/* Feedback Section */}
        {feedback && (
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-slate-800">AI Analysis</Text>
              <TouchableOpacity onPress={loadNextQuestion} className="flex-row items-center bg-sky-100 px-4 py-2 rounded-xl">
                <Icons.ArrowRight size={16} color="#0369a1" className="mr-2" />
                <Text className="text-sky-800 font-bold text-sm">Next Question</Text>
              </TouchableOpacity>
            </View>

            <View className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-4">
              <View className="flex-row items-end justify-between mb-6 border-b border-slate-100 pb-4">
                <View>
                  <Text className="text-slate-500 font-medium mb-1">Overall Score</Text>
                  <Text className="text-4xl font-black text-slate-800">{feedback.overall_score}<Text className="text-lg text-slate-400">/100</Text></Text>
                </View>
                <View className="items-end">
                  <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Leadership</Text>
                  <View className="bg-sky-50 px-3 py-1 rounded-lg border border-sky-100">
                    <Text className="text-sky-700 font-bold">{feedback.leadership_alignment}/100</Text>
                  </View>
                </View>
              </View>

              <View className="gap-4">
                <View>
                  <Text className="font-bold text-emerald-700 mb-2 flex-row items-center"><Icons.ThumbsUp size={16} color="#059669" /> Strengths</Text>
                  {feedback.strengths.map((s, i) => (
                    <Text key={i} className="text-sm text-slate-600 mb-1 leading-relaxed">• {s}</Text>
                  ))}
                </View>
                <View>
                  <Text className="font-bold text-rose-700 mb-2 flex-row items-center"><Icons.TrendingUp size={16} color="#e11d48" /> Areas to Improve</Text>
                  {feedback.improvements.map((s, i) => (
                    <Text key={i} className="text-sm text-slate-600 mb-1 leading-relaxed">• {s}</Text>
                  ))}
                </View>
              </View>
            </View>
            
            <View className="h-[1px] bg-slate-200 my-4" />
            <Text className="text-center font-medium text-slate-500 mb-4">You can edit your answer below and try again to improve your score.</Text>
          </View>
        )}

        {/* STAR Input Section */}
        <View className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          {/* Tab Bar */}
          <View className="flex-row border-b border-slate-200 bg-slate-50">
            <StarTab label="S" title="Situation" isActive={activeTab === 'S'} onPress={() => setActiveTab('S')} hasValue={!!situation} />
            <StarTab label="T" title="Task" isActive={activeTab === 'T'} onPress={() => setActiveTab('T')} hasValue={!!task} />
            <StarTab label="A" title="Action" isActive={activeTab === 'A'} onPress={() => setActiveTab('A')} hasValue={!!action} />
            <StarTab label="R" title="Result" isActive={activeTab === 'R'} onPress={() => setActiveTab('R')} hasValue={!!result} />
          </View>

          {/* Active Input Area */}
          <View className="p-5">
            {activeTab === 'S' && (
              <InputArea 
                label="Situation" 
                placeholder="Where were you working? What was the general context? (Keep it brief, 10-20% of your story)"
                value={situation}
                onChange={setSituation}
                analysis={feedback?.detailed_analysis?.situation}
              />
            )}
            {activeTab === 'T' && (
              <InputArea 
                label="Task" 
                placeholder="What was your specific responsibility? What goal did you need to achieve?"
                value={task}
                onChange={setTask}
                analysis={feedback?.detailed_analysis?.task}
              />
            )}
            {activeTab === 'A' && (
              <InputArea 
                label="Action" 
                placeholder="What exact steps did YOU take? Use 'I', not 'we'. Explain your thought process and technical decisions. (50-60% of your story)"
                value={action}
                onChange={setAction}
                analysis={feedback?.detailed_analysis?.action}
              />
            )}
            {activeTab === 'R' && (
              <InputArea 
                label="Result" 
                placeholder="What was the final outcome? Use numbers, percentages, or time saved. What did you learn?"
                value={result}
                onChange={setResult}
                analysis={feedback?.detailed_analysis?.result}
              />
            )}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => analyzeAnswer('B2')}
          disabled={isAnalyzing}
          className={`h-14 rounded-2xl flex-row items-center justify-center shadow-sm mb-12 ${
            isAnalyzing ? 'bg-sky-300' : 'bg-sky-600'
          }`}
        >
          {isAnalyzing ? (
            <ActivityIndicator color="white" className="mr-3" />
          ) : (
            <Icons.Sparkles size={20} color="white" className="mr-3" />
          )}
          <Text className="text-white font-bold text-lg">{isAnalyzing ? 'Analyzing Response...' : 'Evaluate Answer'}</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function StarTab({ label, title, isActive, onPress, hasValue }: { label: string, title: string, isActive: boolean, onPress: () => void, hasValue: boolean }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-1 py-4 items-center border-b-2 ${isActive ? 'border-sky-500 bg-white' : 'border-transparent'}`}
    >
      <View className="flex-row items-center gap-1.5">
        <Text className={`font-black text-lg ${isActive ? 'text-sky-600' : 'text-slate-400'}`}>{label}</Text>
        {hasValue && !isActive && <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
      </View>
      <Text className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${isActive ? 'text-sky-800' : 'text-slate-400'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function InputArea({ label, placeholder, value, onChange, analysis }: { label: string, placeholder: string, value: string, onChange: (t: string) => void, analysis?: string }) {
  return (
    <View>
      <Text className="text-sm font-bold text-slate-700 mb-3 ml-1 uppercase tracking-wider">{label}</Text>
      <TextInput
        className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 text-base leading-relaxed"
        style={{ minHeight: 180, textAlignVertical: 'top' }}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        multiline
        value={value}
        onChangeText={onChange}
      />
      {analysis && (
        <View className="mt-4 bg-sky-50 p-4 rounded-xl border border-sky-100">
          <Text className="text-xs font-bold text-sky-800 mb-1 uppercase tracking-wider">AI Feedback for {label}</Text>
          <Text className="text-sky-900 text-sm leading-relaxed">{analysis}</Text>
        </View>
      )}
    </View>
  );
}

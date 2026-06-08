import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Icons from 'lucide-react-native';
import { WritingExerciseId, writingExercises } from '@fluenix/shared';

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
    <ScrollView className="flex-1 px-4 pt-6 bg-slate-50">
      <View className="mb-8 items-center mt-2">
        <Text className="text-3xl font-black text-slate-800 font-serif mb-3">Select an Operation</Text>
        <Text className="text-slate-500 text-center leading-relaxed">
          Choose a technical writing scenario to calibrate your FAANG-level communication skills.
        </Text>
      </View>

      <View className="pb-12">
        {writingExercises.map((ex) => {
          const Icon = iconMap[ex.icon] || Icons.FileText;

          return (
            <TouchableOpacity
              key={ex.id}
              onPress={() => changeExercise(ex.id)}
              className="relative overflow-hidden mb-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex-row items-start p-5"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10 }}
            >
              <View className="absolute top-0 bottom-0 left-0 w-1.5" style={{ backgroundColor: ex.color }} />
              
              <View 
                className="w-14 h-14 rounded-xl items-center justify-center mr-4" 
                style={{ backgroundColor: ex.bg }}
              >
                <Icon size={26} color={ex.color} />
              </View>

              <View className="flex-1">
                <Text className="text-xl font-black text-slate-800 font-serif mb-1.5">{ex.label}</Text>
                <Text className="text-sm text-slate-500 leading-relaxed">{ex.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

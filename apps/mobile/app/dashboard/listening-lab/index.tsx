import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { ListeningWorkspace } from '../../../components/listening-lab/ListeningWorkspace';

export default function ListeningLabScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-50">
      {/* Global Header Area */}
      <View className="px-6 pt-10 pb-4 bg-white border-b border-slate-200">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="flex-row items-center mb-4"
        >
          <Icons.ChevronLeft size={16} color="#64748b" />
          <Text className="text-slate-500 font-bold ml-1 text-sm">Return to Dashboard</Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-between">
          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <View className="w-6 h-px bg-cyan-500" />
              <Text className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Auditory Processing</Text>
            </View>
            <Text className="font-black text-2xl text-slate-800">Listening Comprehension</Text>
          </View>
          <View className="w-10 h-10 bg-cyan-50 rounded-full items-center justify-center border border-cyan-100">
            <Icons.Headphones size={20} color="#06b6d4" />
          </View>
        </View>
      </View>

      {/* Main Content Area */}
      <View className="flex-1">
        <ListeningWorkspace />
      </View>
    </View>
  );
}

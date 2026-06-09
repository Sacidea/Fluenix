import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { ModuleItem } from '@fluenix/shared';

interface ModuleCardProps {
  moduleData: ModuleItem;
}

export function ModuleCard({ moduleData }: ModuleCardProps) {
  const router = useRouter();
  const { available, href, color, icon, title, description, image } = moduleData;

  if (!available) {
    return (
      <View className="bg-white border-2 border-dashed border-slate-300 rounded-[24px] p-8 items-center justify-center opacity-60 mb-6 min-h-[200px]">
        <Icons.Lock size={32} color="#94a3b8" />
        <Text className="text-slate-500 font-bold text-[20px] mb-2 mt-4 tracking-tight">{title}</Text>
        <Text className="text-slate-400 text-center font-medium leading-relaxed">{description}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity 
      activeOpacity={0.85}
      onPress={() => router.push(href as never)}
      className="mb-8"
    >
      <View className="relative w-full">
        {/* Asymmetric Colored Backdrop */}
        <View 
          className="absolute rounded-[16px]" 
          style={{ 
            top: 24, 
            left: 0, 
            right: 32, 
            bottom: 0, 
            backgroundColor: `${color}30` 
          }} 
        />
        
        {/* Image Container */}
        {image && (
          <View 
            className="w-[85%] ml-auto aspect-[1.15] rounded-[16px] bg-slate-200 overflow-hidden z-10"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.1,
              shadowRadius: 15,
              elevation: 4
            }}
          >
            <Image 
              source={image}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              transition={200}
            />
          </View>
        )}
        
        {/* Card Content Area */}
        <View className="w-[85%] px-4 pt-5 pb-4 z-10 self-center">
          <Text className="font-bold text-[20px] text-slate-800 text-center mb-1.5 tracking-tight">{title}</Text>
          <Text className="text-slate-500 font-medium text-[13px] text-center leading-[1.6]" numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
      
      {/* Premium CTA Button (Outside the backdrop) */}
      <View 
        className="self-end py-2.5 px-6 rounded-lg z-10 mr-8 mt-2"
        style={{ 
          backgroundColor: color,
          shadowColor: color,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 3
        }}
      >
        <Text className="text-white font-extrabold text-[13px] tracking-widest">ENTER MODULE</Text>
      </View>
    </TouchableOpacity>
  );
}

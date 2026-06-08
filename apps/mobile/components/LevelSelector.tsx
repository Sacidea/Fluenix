import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, Platform, Alert } from 'react-native';
import * as Icons from 'lucide-react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import axios from 'axios';

const LEVEL_MAP = {
  'A2': { label: 'A2 - Elementary', desc: 'Standard operations', color: '#4a6fa5' },
  'B1': { label: 'B1 - Intermediate', desc: 'Technical fluency', color: '#8d7b68' },
  'B2': { label: 'B2 - Upper Inter.', desc: 'High-level analysis', color: '#c18161' },
  'C1': { label: 'C1 - Advanced', desc: 'Architectural mastery', color: '#4338ca' },
  'C2': { label: 'C2 - Mastery', desc: 'Strategic authority', color: '#0f172a' },
};

const getApiUrl = () => {
  if (Platform.OS === 'web') return 'http://localhost:3001';
  return process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3001';
};

export function LevelSelector() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [level, setLevel] = useState('B2');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchUserLevel = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const res = await axios.get(`${getApiUrl()}/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data?.level) {
          setLevel(res.data.level);
        }
      } catch (err) {
        console.warn('Failed to fetch initial level', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserLevel();
  }, [user]);

  const handleSelectLevel = async (newLevel: string) => {
    setModalVisible(false);
    if (!user || newLevel === level) return;
    
    setLevel(newLevel); // Optimistic UI update
    
    try {
      const token = await getToken();
      await axios.put(`${getApiUrl()}/api/users/${user.id}/level`, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        level: newLevel
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });
      // Tell user they need to reload apps for publicMetadata to sync right away if we use Clerk
      if (Platform.OS !== 'web') {
        Alert.alert('Kalibrasyon Güncellendi', `Seviyeniz ${newLevel} olarak ayarlandı. Değişikliklerin etkili olması için modülleri yeniden açabilirsiniz.`);
      }
    } catch (err) {
      console.error('Failed to sync level', err);
      Alert.alert('Hata', 'Seviye güncellenirken bir hata oluştu.');
    }
  };

  if (loading) {
    return (
      <View className="bg-slate-100 rounded-lg px-3 py-1.5 flex-row items-center">
        <ActivityIndicator size="small" color="#94a3b8" />
      </View>
    );
  }

  const activeObj = LEVEL_MAP[level as keyof typeof LEVEL_MAP] || LEVEL_MAP['B2'];

  return (
    <View>
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        className="bg-white border border-slate-200 shadow-sm rounded-lg flex-row items-center px-3 py-1.5 gap-2"
      >
        <Icons.Settings2 size={14} color="#64748b" />
        <Text className="font-bold text-slate-700 text-xs">Seviye: {level}</Text>
        <View 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: activeObj.color }}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          className="flex-1 justify-end bg-slate-900/50"
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity 
            activeOpacity={1}
            className="bg-white rounded-t-3xl p-6 shadow-xl"
          >
            <View className="flex-row items-center justify-between mb-6">
              <View>
                <Text className="font-black text-xl text-slate-800">Kalibrasyon Ayarları</Text>
                <Text className="text-slate-500 mt-1">Sistem zorluk seviyesini seçin</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-slate-100 p-2 rounded-full">
                <Icons.X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View className="gap-3">
              {Object.entries(LEVEL_MAP).map(([key, obj]) => {
                const isSelected = key === level;
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => handleSelectLevel(key)}
                    className={`flex-row items-center justify-between p-4 rounded-xl border ${isSelected ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200'}`}
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="w-3 h-3 rounded-full" style={{ backgroundColor: obj.color }} />
                      <View>
                        <Text className={`font-bold text-base ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>{obj.label}</Text>
                        <Text className={`font-mono text-[10px] uppercase tracking-wider ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>{obj.desc}</Text>
                      </View>
                    </View>
                    {isSelected && <Icons.Check size={20} color="#4f46e5" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

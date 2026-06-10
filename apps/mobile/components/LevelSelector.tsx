import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, Platform, Alert, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import axios from 'axios';
import { API_URL } from '../utils/apiClient';
import { colors, shadow } from '../utils/theme';

const LEVEL_MAP = {
  'A2': { label: 'A2 - Elementary', desc: 'Standard operations', color: '#4a6fa5' },
  'B1': { label: 'B1 - Intermediate', desc: 'Technical fluency', color: '#8d7b68' },
  'B2': { label: 'B2 - Upper Inter.', desc: 'High-level analysis', color: '#c18161' },
  'C1': { label: 'C1 - Advanced', desc: 'Architectural mastery', color: '#4338ca' },
  'C2': { label: 'C2 - Mastery', desc: 'Strategic authority', color: '#0f172a' },
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
        const res = await axios.get(`${API_URL}/api/users/${user.id}`, {
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
      await axios.put(`${API_URL}/api/users/${user.id}/level`, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        level: newLevel
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });
      // Tell user they need to reload apps for publicMetadata to sync right away if we use Clerk
      if (Platform.OS !== 'web') {
        Alert.alert('Calibration Updated', `Your level has been set to ${newLevel}. You can reopen modules for changes to take effect.`);
      }
    } catch (err) {
      console.error('Failed to sync level', err);
      Alert.alert('Error', 'An error occurred while updating your level.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#94a3b8" />
      </View>
    );
  }

  const activeObj = LEVEL_MAP[level as keyof typeof LEVEL_MAP] || LEVEL_MAP['B2'];

  return (
    <View>
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        style={styles.triggerButton}
      >
        <Icons.Settings2 size={14} color="#64748b" />
        <Text style={styles.triggerLabel}>Level: {level}</Text>
        <View 
          style={[styles.levelDot, { backgroundColor: activeObj.color }]}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity 
            activeOpacity={1}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Calibration Settings</Text>
                <Text style={styles.modalSubtitle}>Select system difficulty level</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Icons.X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.levelList}>
              {Object.entries(LEVEL_MAP).map(([key, obj]) => {
                const isSelected = key === level;
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => handleSelectLevel(key)}
                    style={[
                      styles.levelItem,
                      isSelected ? styles.levelItemSelected : styles.levelItemDefault,
                    ]}
                  >
                    <View style={styles.levelItemLeft}>
                      <View style={[styles.levelItemDot, { backgroundColor: obj.color }]} />
                      <View>
                        <Text style={[styles.levelItemLabel, isSelected ? styles.levelItemLabelSelected : styles.levelItemLabelDefault]}>{obj.label}</Text>
                        <Text style={[styles.levelItemDesc, isSelected ? styles.levelItemDescSelected : styles.levelItemDescDefault]}>{obj.desc}</Text>
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

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: colors.slate100,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  triggerButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    ...shadow.sm,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  triggerLabel: {
    fontWeight: '700',
    color: colors.slate700,
    fontSize: 10,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  modalTitle: {
    fontWeight: '900',
    fontSize: 20,
    color: colors.slate800,
  },
  modalSubtitle: {
    color: colors.slate500,
    marginTop: 4,
  },
  closeButton: {
    backgroundColor: colors.slate100,
    padding: 8,
    borderRadius: 9999,
  },
  levelList: {
    gap: 12,
  },
  levelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  levelItemSelected: {
    backgroundColor: colors.primaryBg,
    borderColor: '#c7d2fe',
  },
  levelItemDefault: {
    backgroundColor: colors.white,
    borderColor: colors.slate200,
  },
  levelItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelItemDot: {
    width: 12,
    height: 12,
    borderRadius: 9999,
  },
  levelItemLabel: {
    fontWeight: '700',
    fontSize: 14,
  },
  levelItemLabelSelected: {
    color: '#312e81',
  },
  levelItemLabelDefault: {
    color: colors.slate700,
  },
  levelItemDesc: {
    fontFamily: 'monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  levelItemDescSelected: {
    color: colors.primary,
  },
  levelItemDescDefault: {
    color: colors.slate400,
  },
});

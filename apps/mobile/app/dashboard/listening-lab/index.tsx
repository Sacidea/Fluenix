import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { ListeningWorkspace } from '../../../components/listening-lab/ListeningWorkspace';
import { colors } from '../../../utils/theme';

export default function ListeningLabScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Global Header Area */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Icons.ChevronLeft size={16} color="#64748b" />
          <Text style={styles.backText}>Return to Dashboard</Text>
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <View>
            <View style={styles.labelRow}>
              <View style={styles.labelAccentCyan} />
              <Text style={styles.labelText}>Auditory Processing</Text>
            </View>
            <Text style={styles.title}>Listening Comprehension</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icons.Headphones size={20} color="#06b6d4" />
          </View>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentArea}>
        <ListeningWorkspace />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    color: colors.slate500,
    fontWeight: '700',
    marginLeft: 4,
    fontSize: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  labelAccentCyan: {
    width: 24,
    height: 1,
    backgroundColor: colors.cyan500,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: colors.slate400,
  },
  title: {
    fontWeight: '900',
    fontSize: 24,
    color: colors.slate800,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#ecfeff',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cffafe',
  },
  contentArea: {
    flex: 1,
  },
});

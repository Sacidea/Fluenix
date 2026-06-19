import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { ErrorWorkspace } from '../../../components/error-decoding/ErrorWorkspace';
import { colors } from '../../../utils/theme';

export default function ErrorDecodingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.replace('/dashboard')} 
          style={styles.backButton}
        >
          <Icons.ChevronLeft size={16} color="#64748b" />
          <Text style={styles.backText}>Return to Dashboard</Text>
        </TouchableOpacity>
        
        <View style={styles.labelRow}>
          <View style={styles.labelAccent} />
          <Text style={styles.labelText}>Decoding Lab</Text>
        </View>
        <Text style={styles.title}>Error Decoder</Text>
        <Text style={styles.description}>
          Master stack traces, debug logs, and technical documentation.
        </Text>
      </View>

      {/* WORKSPACE */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}>
        <ErrorWorkspace />
      </ScrollView>
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
    paddingBottom: 24,
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
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  labelAccent: {
    width: 24,
    height: 1,
    backgroundColor: colors.primary,
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
    fontSize: 30,
    color: colors.slate800,
    marginBottom: 4,
  },
  description: {
    color: colors.slate500,
    lineHeight: 22,
    fontSize: 12,
  },
});

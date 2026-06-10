import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { ModuleItem } from '@fluenix/shared';
import { colors } from '../utils/theme';

interface ModuleCardProps {
  moduleData: ModuleItem;
}

export function ModuleCard({ moduleData }: ModuleCardProps) {
  const router = useRouter();
  const { available, href, color, icon, title, description, image } = moduleData;

  if (!available) {
    return (
      <View style={styles.unavailableContainer}>
        <Icons.Lock size={32} color="#94a3b8" />
        <Text style={styles.unavailableTitle}>{title}</Text>
        <Text style={styles.unavailableDesc}>{description}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity 
      activeOpacity={0.85}
      onPress={() => router.push(href as never)}
      style={styles.cardWrapper}
    >
      <View style={styles.relativeContainer}>
        {/* Asymmetric Colored Backdrop */}
        <View 
          style={[styles.backdrop, { backgroundColor: `${color}30` }]} 
        />
        
        {/* Image Container */}
        {image && (
          <View style={styles.imageContainer}>
            <Image 
              source={image}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              transition={200}
            />
          </View>
        )}
        
        {/* Card Content Area */}
        <View style={styles.contentArea}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
      
      {/* Premium CTA Button (Outside the backdrop) */}
      <View 
        style={[styles.ctaButton, { 
          backgroundColor: color,
          shadowColor: color,
        }]}
      >
        <Text style={styles.ctaText}>ENTER MODULE</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  unavailableContainer: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.slate300,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    marginBottom: 24,
    minHeight: 200,
  },
  unavailableTitle: {
    color: colors.slate500,
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 8,
    marginTop: 16,
    letterSpacing: -0.5,
  },
  unavailableDesc: {
    color: colors.slate400,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 22,
  },
  cardWrapper: {
    marginBottom: 32,
  },
  relativeContainer: {
    position: 'relative',
    width: '100%',
  },
  backdrop: {
    position: 'absolute',
    borderRadius: 16,
    top: 24,
    left: 0,
    right: 32,
    bottom: 0,
  },
  imageContainer: {
    width: '85%',
    marginLeft: 'auto',
    aspectRatio: 1.15,
    borderRadius: 16,
    backgroundColor: colors.slate200,
    overflow: 'hidden',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  contentArea: {
    width: '85%',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    zIndex: 10,
    alignSelf: 'center',
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.slate800,
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  cardDescription: {
    color: colors.slate500,
    fontWeight: '500',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 21,
  },
  ctaButton: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    zIndex: 10,
    marginRight: 32,
    marginTop: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },
  ctaText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 4,
  },
});

/**
 * Fluenix Mobile Design Tokens
 * Centralized theme values replacing scattered Tailwind classes
 */

export const colors = {
  // Primary (Indigo)
  primary: '#4f46e5',
  primaryDark: '#4338ca',
  primaryLight: '#e0e7ff',
  primaryBg: '#eef2ff',

  // Slate (Neutral)
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  slate900: '#0f172a',

  // Semantic
  white: '#ffffff',
  black: '#000000',
  red500: '#ef4444',
  red600: '#dc2626',
  green500: '#22c55e',
  green600: '#16a34a',
  green700: '#15803d',
  amber500: '#f59e0b',
  amber600: '#d97706',
  emerald500: '#10b981',
  emerald600: '#059669',
  sky500: '#0ea5e9',
  rose500: '#f43f5e',
  yellow400: '#facc15',
  yellow500: '#eab308',
  orange500: '#f97316',
  blue500: '#3b82f6',
  purple500: '#a855f7',
  cyan500: '#06b6d4',
  cyan600: '#0891b2',
  teal500: '#14b8a6',
  pink500: '#ec4899',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 48,
} as const;

export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  huge: 36,
} as const;

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
};

export const borderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 24,
  full: 9999,
} as const;

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;

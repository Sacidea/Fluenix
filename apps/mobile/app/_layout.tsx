import { Stack } from 'expo-router';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '../utils/clerk';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

function ClerkLoadingGate({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  if (!publishableKey) {
    return (
      <View style={styles.loading}>
        <Text style={styles.errorText}>Missing Clerk Key</Text>
        <Text style={styles.subText}>Check .env file</Text>
      </View>
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoadingGate>
        <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen name="index" options={{ title: 'Fluenix' }} />
          <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
          <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
          <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
        </Stack>
      </ClerkLoadingGate>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 12,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 8,
  },
});

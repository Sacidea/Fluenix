import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { colors } from '../utils/theme';

export default function IndexScreen() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  console.log("[Index] Render - isLoaded:", isLoaded, "isSignedIn:", isSignedIn);

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading Clerk State...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fluenix Mobile</Text>
      
      {isSignedIn ? (
        <View style={styles.innerContainer}>
          <Text style={styles.subtitle}>
            Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
          </Text>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/dashboard')}
          >
            <Text style={styles.primaryButtonText}>Enter Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => signOut()}
          >
            <Text style={styles.secondaryButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.innerContainer}>
          <Text style={styles.subtitle}>
            Sign in to start your technical interview simulations.
          </Text>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/sign-in')}
          >
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/sign-up')}
          >
            <Text style={styles.secondaryButtonTextLg}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 16,
  },
  loadingText: {
    color: colors.slate800,
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  innerContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 384,
  },
  subtitle: {
    fontSize: 14,
    color: colors.slate500,
    marginBottom: 24,
    textAlign: 'center',
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.slate200,
  },
  secondaryButtonText: {
    color: colors.slate700,
    fontWeight: '700',
  },
  secondaryButtonTextLg: {
    color: colors.slate700,
    fontWeight: '700',
    fontSize: 18,
  },
});

import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onGooglePress = useCallback(async () => {
    try {
      console.log("Starting OAuth flow...");
      const result = await startOAuthFlow({
        redirectUrl: Linking.createURL('/', { scheme: 'fluenix' }),
      });
      console.log("OAuth Result:", JSON.stringify(result));

      if (result.createdSessionId && result.setActive) {
        console.log("Setting active session...");
        await result.setActive({ session: result.createdSessionId });
        console.log("Session set! Redirecting...");
        router.replace('/');
      } else {
        console.log("No createdSessionId returned.", result);
        Alert.alert("Error", "Google Login didn't complete (no session ID).");
      }
    } catch (error: unknown) {
      const err = error as any;
      console.error('Google Sign-In error:', err);
      Alert.alert("Sign In Failed", err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || 'Google sign-in failed');
    }
  }, [startOAuthFlow]);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      router.replace('/');
    } catch (error: unknown) {
      const err = error as any;
      console.error("Sign in error:", err);
      Alert.alert("Sign In Failed", err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TouchableOpacity style={styles.googleButton} onPress={onGooglePress}>
        <Text style={styles.googleIcon}>G</Text>
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>
      
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={setEmailAddress}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={setPassword}
        style={[styles.input, { marginBottom: 24 }]}
      />

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.5 }]}
        onPress={onSignInPress}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.linkButton}
        onPress={() => router.push('/sign-up')}
      >
        <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkBold}>Sign Up</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', padding: 24 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#1e293b', marginBottom: 32 },
  googleButton: { 
    flexDirection: 'row', width: '100%', maxWidth: 384, backgroundColor: '#ffffff', 
    paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    marginBottom: 20, borderWidth: 1.5, borderColor: '#e2e8f0',
  },
  googleIcon: { fontSize: 20, fontWeight: 'bold', color: '#4285F4', marginRight: 10 },
  googleText: { color: '#334155', fontWeight: '600', fontSize: 16 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: 384, marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#e2e8f0' },
  dividerText: { marginHorizontal: 12, color: '#94a3b8', fontSize: 14 },
  input: { width: '100%', maxWidth: 384, backgroundColor: '#f1f5f9', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 12, marginBottom: 16, color: '#1e293b' },
  button: { width: '100%', maxWidth: 384, backgroundColor: '#4f46e5', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 18 },
  cancelButton: { width: '100%', maxWidth: 384, paddingVertical: 16, alignItems: 'center' },
  cancelText: { color: '#64748b', fontWeight: '600', fontSize: 16 },
  linkButton: { width: '100%', maxWidth: 384, paddingVertical: 12, alignItems: 'center' },
  linkText: { color: '#64748b', fontSize: 14 },
  linkBold: { color: '#4f46e5', fontWeight: 'bold' },
});

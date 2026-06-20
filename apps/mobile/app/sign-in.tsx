import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { colors } from '../utils/theme';

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

      const result = await startOAuthFlow({
        redirectUrl: Linking.createURL('/', { scheme: 'fluenix' }),
      });


      if (result.createdSessionId && result.setActive) {

        await result.setActive({ session: result.createdSessionId });

        router.replace('/');
      } else {

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
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white, padding: 24 },
  title: { fontSize: 30, fontWeight: '700', color: colors.slate800, marginBottom: 32 },
  googleButton: { 
    flexDirection: 'row', width: '100%', maxWidth: 384, backgroundColor: colors.white, 
    paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    marginBottom: 20, borderWidth: 1.5, borderColor: colors.slate200,
  },
  googleIcon: { fontSize: 20, fontWeight: '700', color: '#4285F4', marginRight: 10 },
  googleText: { color: colors.slate700, fontWeight: '600', fontSize: 16 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: 384, marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.slate200 },
  dividerText: { marginHorizontal: 12, color: colors.slate400, fontSize: 14 },
  input: { width: '100%', maxWidth: 384, backgroundColor: colors.slate100, paddingHorizontal: 16, paddingVertical: 16, borderRadius: 12, marginBottom: 16, color: colors.slate800 },
  button: { width: '100%', maxWidth: 384, backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: colors.white, fontWeight: '700', fontSize: 18 },
  cancelButton: { width: '100%', maxWidth: 384, paddingVertical: 16, alignItems: 'center' },
  cancelText: { color: colors.slate500, fontWeight: '600', fontSize: 16 },
  linkButton: { width: '100%', maxWidth: 384, paddingVertical: 12, alignItems: 'center' },
  linkText: { color: colors.slate500, fontSize: 14 },
  linkBold: { color: colors.primary, fontWeight: '700' },
});

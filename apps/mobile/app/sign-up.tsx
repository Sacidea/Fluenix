import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useSignUp, useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

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
      console.error('Google Sign-Up error:', err);
      Alert.alert("Sign Up Failed", err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || 'Google sign-up failed');
    }
  }, [startOAuthFlow]);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (error: unknown) {
      const err = error as any;
      console.error(err);
      alert(err.errors[0]?.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/');
      }
    } catch (error: unknown) {
      const err = error as any;
      console.error(err);
      alert(err.errors[0]?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify Email</Text>
        <Text style={styles.subtitle}>We sent a verification code to your email.</Text>
        <TextInput
          value={code}
          placeholder="Verification code..."
          onChangeText={setCode}
          keyboardType="number-pad"
          style={styles.input}
        />
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.5 }]}
          onPress={onPressVerify}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setPendingVerification(false)}>
          <Text style={styles.cancelText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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
        onPress={onSignUpPress}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Signing up...' : 'Sign Up'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/sign-in')}>
        <Text style={styles.linkText}>Already have an account? <Text style={styles.linkBold}>Sign In</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', padding: 24 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  subtitle: { fontSize: 14, color: '#64748b', marginBottom: 24, textAlign: 'center' },
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
  linkButton: { width: '100%', maxWidth: 384, paddingVertical: 12, alignItems: 'center' },
  linkText: { color: '#64748b', fontSize: 14 },
  linkBold: { color: '#4f46e5', fontWeight: 'bold' },
  cancelButton: { width: '100%', maxWidth: 384, paddingVertical: 16, alignItems: 'center' },
  cancelText: { color: '#64748b', fontWeight: '600', fontSize: 16 },
});

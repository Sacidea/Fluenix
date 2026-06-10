import { Stack } from 'expo-router';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '../utils/clerk';
import '../global.css';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
// We no longer throw an error at the module level to avoid white screens.
// If the key is missing, ClerkProvider will fail inside the React tree where ErrorBoundary can catch it.

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: 'Fluenix' }} />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

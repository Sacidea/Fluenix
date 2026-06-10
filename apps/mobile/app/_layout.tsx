import { Stack } from 'expo-router';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import * as Sentry from '@sentry/react-native';
import { tokenCache } from '../utils/clerk';
import '../global.css';

import { OfflineWarning } from '../components/OfflineWarning';
import { GlobalErrorBoundary } from '../components/GlobalErrorBoundary';

if (process.env.EXPO_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    debug: false,
    tracesSampleRate: 1.0,
  });
}

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
// We no longer throw an error at the module level to avoid white screens.
// If the key is missing, ClerkProvider will fail inside the React tree where ErrorBoundary can catch it.

function RootLayout() {
  return (
    <GlobalErrorBoundary>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <OfflineWarning />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: 'Fluenix' }} />
          </Stack>
        </ClerkLoaded>
      </ClerkProvider>
    </GlobalErrorBoundary>
  );
}

export default process.env.EXPO_PUBLIC_SENTRY_DSN ? Sentry.wrap(RootLayout) : RootLayout;

import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  console.log("[Index] Render - isLoaded:", isLoaded, "isSignedIn:", isSignedIn);

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-slate-800 text-lg font-bold">Loading Clerk State...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-3xl font-bold text-indigo-600 mb-2">Fluenix Mobile</Text>
      
      {isSignedIn ? (
        <View className="items-center w-full max-w-sm">
          <Text className="text-base text-slate-500 mb-6 text-center">
            Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
          </Text>
          <TouchableOpacity 
            className="w-full py-3 rounded-xl items-center mb-4 bg-indigo-600"
            onPress={() => router.push('/dashboard')}
          >
            <Text className="text-white font-bold text-lg">Enter Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="w-full py-3 rounded-xl items-center mb-4 bg-slate-200"
            onPress={() => signOut()}
          >
            <Text className="text-slate-700 font-bold">Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="items-center w-full max-w-sm">
          <Text className="text-base text-slate-500 mb-6 text-center">
            Sign in to start your technical interview simulations.
          </Text>
          <TouchableOpacity 
            className="w-full py-3 rounded-xl items-center mb-4 bg-indigo-600"
            onPress={() => router.push('/sign-in')}
          >
            <Text className="text-white font-bold text-lg">Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="w-full py-3 rounded-xl items-center mb-4 bg-slate-200"
            onPress={() => router.push('/sign-up')}
          >
            <Text className="text-slate-700 font-bold text-lg">Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="w-full py-3 rounded-xl items-center mb-4 bg-red-500"
            onPress={() => router.push('/dashboard')}
          >
            <Text className="text-white font-bold text-lg">Bypass Auth (Test)</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

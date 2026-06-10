import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import * as Network from 'expo-network';
import * as Icons from 'lucide-react-native';
import { colors, shadow } from '../utils/theme';

export function OfflineWarning() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    let isMounted = true;
    let interval: NodeJS.Timeout;

    const checkNetwork = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        if (isMounted) {
          setIsConnected(networkState.isConnected ?? true);
        }
      } catch (e) {
        // Ignore checking errors
      }
    };

    checkNetwork();
    
    // We can poll since expo-network doesn't have a listener out of the box
    interval = setInterval(checkNetwork, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isConnected === false ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isConnected]);

  if (isConnected !== false) return null;

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              })
            }
          ]
        }
      ]}
    >
      <View style={styles.banner}>
        <Icons.WifiOff size={16} color="white" />
        <Text style={styles.bannerText}>No Internet Connection. Some features may be unavailable.</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 48,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.rose500,
    ...shadow.md,
    zIndex: 50,
  },
  bannerText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 8,
  },
});

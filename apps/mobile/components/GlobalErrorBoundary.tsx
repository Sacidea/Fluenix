import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as Updates from 'expo-updates';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("GlobalErrorBoundary caught an error:", error, errorInfo);
  }

  async restartApp() {
    try {
      await Updates.reloadAsync();
    } catch (e) {
      console.warn("Could not reload app", e);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, backgroundColor: '#f87171', padding: 20, paddingTop: 60 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
            Fatal Error!
          </Text>
          <Text style={{ fontSize: 16, color: 'white', marginBottom: 20 }}>
            Please screenshot this screen and send it to the developer:
          </Text>
          <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', padding: 10, borderRadius: 8 }}>
            <Text style={{ fontFamily: 'monospace', color: 'white' }}>
              {this.state.error?.name}: {this.state.error?.message}
            </Text>
            <Text style={{ fontFamily: 'monospace', color: '#fca5a5', marginTop: 10, fontSize: 12 }}>
              {this.state.error?.stack}
            </Text>
          </ScrollView>
          <TouchableOpacity 
            onPress={() => this.restartApp()}
            style={{ backgroundColor: 'white', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 }}
          >
            <Text style={{ color: '#ef4444', fontWeight: 'bold', fontSize: 16 }}>Restart App</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

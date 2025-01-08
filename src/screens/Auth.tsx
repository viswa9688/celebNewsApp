import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '../lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { AUTH_CONFIG } from '../config/auth';
import { makeRedirectUri } from 'expo-auth-session';
import { GOOGLE_AUTH } from '../constants/auth';
import * as Linking from 'expo-linking';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

WebBrowser.maybeCompleteAuthSession();

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Auth() {
  const navigation = useNavigation<NavigationProp>();
  const { refreshSession, session } = useAuth();

  useEffect(() => {
    if (session?.user) {
      console.log('Session detected, navigating to NewsFeed');
      navigation.replace('NewsFeed');
    }
  }, [session, navigation]);

  console.log('Auth component mounted');
  console.log('Supabase client:', !!supabase); // Check if supabase client exists
  console.log('Supabase auth:', !!supabase.auth); // Check if auth is available

  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    try {
      setLoading(true);
      console.log('=== Starting Google Sign In Flow ===');

      const redirectUrl = `${GOOGLE_AUTH.SCHEME}://auth-callback`;
      console.log('1. Using redirect URL:', redirectUrl);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        },
      });

      if (error) throw error;

      if (data?.url) {
        console.log('4. Opening auth URL:', data.url);
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl
        );

        console.log('5. WebBrowser Result:', result);

        if (result.type === 'success') {
          await WebBrowser.coolDownAsync();

          // Extract both tokens from URL
          const url = new URL(result.url);
          const access_token = url.hash.split('&')[0].split('=')[1];
          const refresh_token = url.hash.split('refresh_token=')[1]?.split('&')[0];

          // Set the session manually
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (sessionError) throw sessionError;

          if (sessionData.session) {
            console.log('Session set successfully');
            await refreshSession();
            navigation.replace('NewsFeed');
          }
        }
      }
    } catch (error) {
      console.error('❌ Error:', error);
      Alert.alert('Error', 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Celebrity News Feed</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={signInWithGoogle}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="logo-google" size={24} color="#fff" style={styles.googleIcon} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    marginRight: 12,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
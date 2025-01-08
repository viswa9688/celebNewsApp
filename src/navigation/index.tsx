import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import { View, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import Auth from '../screens/Auth';
import NewsFeed from '../screens/NewsFeed';
import NewsDetail from '../screens/NewsDetail';
import { defaultScreenOptions } from './config';
import type { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Navigation - Current Session:', session); // Debug log
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Navigation - Auth State Changed:', session); // Debug log
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF2D55" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        {session?.user ? (
          <>
            <Stack.Screen
              name="NewsFeed"
              component={NewsFeed}
              options={{ title: 'Celebrity News' }}
            />
            <Stack.Screen
              name="NewsDetail"
              component={NewsDetail}
              options={{ title: 'News Details' }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
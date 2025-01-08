import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NewsFeed from './src/screens/NewsFeed';
import NewsDetail from './src/screens/NewsDetail';
import { NewsProvider } from './src/context/NewsContext';
import { defaultScreenOptions } from './src/navigation/config';
import type { RootStackParamList } from './src/types/navigation';
import { AuthProvider } from './src/context/AuthContext';
import Auth from './src/screens/Auth';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthProvider>
        <NewsProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={defaultScreenOptions} initialRouteName="Auth">
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{ headerShown: false }}
              />
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
            </Stack.Navigator>
          </NavigationContainer>
        </NewsProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
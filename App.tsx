import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsFeed from './src/screens/NewsFeed';
import NewsDetail from './src/screens/NewsDetail';
import { NewsProvider } from './src/context/NewsContext';
import { defaultScreenOptions } from './src/navigation/config';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NewsProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultScreenOptions}>
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
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsFeed from './src/screens/NewsFeed';
import NewsDetail from './src/screens/NewsDetail';
import { NewsProvider } from './src/context/NewsContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NewsProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#FF2D55',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
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
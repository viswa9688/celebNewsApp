import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNews } from '../context/NewsContext';
import NewsCard from '../components/NewsCard';
import type { NewsFeedScreenProps } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const NewsFeed = ({ navigation }: NewsFeedScreenProps) => {
  const { newsItems } = useNews();
  const { signOut } = useAuth();

  const handlePress = (id: string) => {
    const index = newsItems.findIndex(item => item.id === id);
    navigation.navigate('NewsDetail', {
      id,
      newsItems,
      index
    });
  };

  const handleSignOut = async () => {
    try {
      console.log('Starting sign out...');
      await signOut();
      console.log('Sign out successful');
      navigation.replace('Auth');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.logoutButton}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF2D55" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={newsItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsCard
            item={item}
            onPress={() => handlePress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: StatusBar.currentHeight,
  },
  listContent: {
    paddingVertical: 12,
  },
  logoutButton: {
    marginRight: 16,
  },
});

export default NewsFeed;
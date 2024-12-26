import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { useNews } from '../context/NewsContext';
import NewsCard from '../components/NewsCard';
import type { NewsFeedScreenProps } from '../types/navigation';

const NewsFeed = ({ navigation }: NewsFeedScreenProps) => {
  const { newsItems } = useNews();

  const handlePress = (id: string) => {
    const index = newsItems.findIndex(item => item.id === id);
    navigation.navigate('NewsDetail', {
      id,
      newsItems,
      index
    });
  };

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
});

export default NewsFeed;
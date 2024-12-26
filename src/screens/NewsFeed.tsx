import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNews } from '../context/NewsContext';
import NewsCard from '../components/NewsCard';

const NewsFeed = () => {
  const navigation = useNavigation();
  const { newsItems } = useNews();

  const handlePress = (id: string) => {
    navigation.navigate('NewsDetail', { id });
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
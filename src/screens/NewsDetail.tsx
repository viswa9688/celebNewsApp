import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNews } from '../context/NewsContext';
import VideoOverlay from '../components/VideoOverlay';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';
import type { NewsDetailScreenProps } from '../types/navigation';

const NewsDetail: React.FC<NewsDetailScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const { getNewsItem, newsItems } = useNews();
  const newsItem = getNewsItem(id);

  const getCurrentIndex = () => newsItems.findIndex(item => item.id === id);

  const navigateToNews = (index: number) => {
    if (index >= 0 && index < newsItems.length) {
      navigation.setParams({ id: newsItems[index].id });
    }
  };

  const handleSwipeUp = () => {
    const nextIndex = getCurrentIndex() + 1;
    navigateToNews(nextIndex);
  };

  const handleSwipeDown = () => {
    const prevIndex = getCurrentIndex() - 1;
    navigateToNews(prevIndex);
  };

  const panResponder = useSwipeNavigation(handleSwipeUp, handleSwipeDown);

  if (!newsItem) return null;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <ScrollView bounces={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: newsItem.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          {newsItem.isVideo && <VideoOverlay />}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{newsItem.title}</Text>
          <Text style={styles.description}>{newsItem.description}</Text>
          <Text style={styles.fullContent}>{newsItem.fullContent}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: Dimensions.get('window').height * 0.4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  fullContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default NewsDetail;
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
import { SwipeableCard } from '../components/SwipeableCard';
import type { NewsDetailScreenProps } from '../types/navigation';

const NewsDetail = ({ route, navigation }: NewsDetailScreenProps) => {
  const { id } = route.params;
  const { getNewsItem, newsItems } = useNews();
  const newsItem = getNewsItem(id);

  const currentIndex = newsItems.findIndex(item => item.id === id);
  const canSwipeUp = currentIndex < newsItems.length - 1;
  const canSwipeDown = currentIndex > 0;

  const handleSwipeUp = () => {
    if (canSwipeUp) {
      const nextItem = newsItems[currentIndex + 1];
      navigation.setParams({ id: nextItem.id });
    }
  };

  const handleSwipeDown = () => {
    if (canSwipeDown) {
      const prevItem = newsItems[currentIndex - 1];
      navigation.setParams({ id: prevItem.id });
    }
  };

  if (!newsItem) return null;

  return (
    <View style={styles.container}>
      <SwipeableCard
        onSwipeUp={handleSwipeUp}
        onSwipeDown={handleSwipeDown}
        canSwipeUp={canSwipeUp}
        canSwipeDown={canSwipeDown}
        index={currentIndex}
      >
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
      </SwipeableCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
    backgroundColor: '#fff',
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
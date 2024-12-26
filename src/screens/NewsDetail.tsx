import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNews } from '../context/NewsContext';
import VideoOverlay from '../components/VideoOverlay';

const NewsDetail = () => {
  const route = useRoute();
  const { id } = route.params;
  const { getNewsItem } = useNews();
  const newsItem = getNewsItem(id);

  if (!newsItem) return null;

  return (
    <ScrollView style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
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
    fontWeight: '700',
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
import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Dimensions } from 'react-native';
import VideoOverlay from '../VideoOverlay';
import type { NewsItem } from '../../types';

const { height } = Dimensions.get('window');

interface NewsContentProps {
  item: NewsItem;
}

export const NewsContent: React.FC<NewsContentProps> = ({ item }) => (
  <ScrollView bounces={false}>
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      {item.isVideo && <VideoOverlay />}
    </View>
    <View style={styles.content}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.fullContent}>{item.fullContent}</Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: height * 0.35,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  fullContent: {
    fontSize: 14,
    lineHeight: 20,
  },
});
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import VideoOverlay from '../VideoOverlay';

interface CardImageProps {
  imageUrl: string;
  isVideo?: boolean;
}

export const CardImage: React.FC<CardImageProps> = ({ imageUrl, isVideo }) => (
  <View style={styles.imageContainer}>
    <Image
      source={{ uri: imageUrl }}
      style={styles.image}
      resizeMode="cover"
    />
    {isVideo && <VideoOverlay />}
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.8)']}
      style={styles.gradient}
    />
  </View>
);

const styles = StyleSheet.create({
  imageContainer: {
    height: '60%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
});
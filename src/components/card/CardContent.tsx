import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface CardContentProps {
  title: string;
  description: string;
}

export const CardContent: React.FC<CardContentProps> = ({ title, description }) => (
  <View style={styles.content}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flex: 1,
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
    lineHeight: 24,
  },
});
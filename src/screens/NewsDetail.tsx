import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NewsContent } from '../components/news/NewsContent';
import { CardStack } from '../components/CardStack';
import { useNewsNavigation } from '../hooks/useNewsNavigation';
import type { NewsDetailScreenProps } from '../types/navigation';

const NewsDetail = ({ route }: NewsDetailScreenProps) => {
  const { newsItems, index } = route.params;

  const {
    currentItem,
    nextItem,
    prevItem,
    handleSwipeUp,
    handleSwipeDown,
    currentIndex,
    isTransitioning,
    handleTransitionEnd,
  } = useNewsNavigation({
    newsItems,
    initialIndex: index,
  });

  if (!currentItem) return null;

  return (
    <View style={styles.container}>
      <CardStack
        currentItem={{
          id: currentItem.id,
          children: <NewsContent item={currentItem} />
        }}
        nextItem={nextItem && {
          id: nextItem.id,
          children: <NewsContent item={nextItem} />
        }}
        prevItem={prevItem && {
          id: prevItem.id,
          children: <NewsContent item={prevItem} />
        }}
        onSwipeUp={handleSwipeUp}
        onSwipeDown={handleSwipeDown}
        currentIndex={currentIndex}
        isTransitioning={isTransitioning}
        onTransitionEnd={handleTransitionEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default NewsDetail;
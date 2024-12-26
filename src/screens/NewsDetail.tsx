import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NewsContent } from '../components/news/NewsContent';
import { CardStack } from '../components/CardStack';
import { useNewsNavigation } from '../hooks/useNewsNavigation';
import type { NewsDetailScreenProps } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';

const NewsDetail = ({ route }: NewsDetailScreenProps) => {
  const navigation = useNavigation();
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

  const handleSwipeRight = () => {
    navigation.goBack();
  };

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
        onSwipeRight={handleSwipeRight}
        currentIndex={currentIndex}
        isTransitioning={isTransitioning}
        onTransitionEnd={handleTransitionEnd}
        canSwipeUp={currentIndex < newsItems.length - 1}
        canSwipeDown={currentIndex > 0}
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
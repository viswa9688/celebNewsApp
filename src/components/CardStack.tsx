import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardItem } from '../types';
import { SwipeableCard } from './SwipeableCard';

interface CardStackProps {
  currentItem: CardItem;
  nextItem?: CardItem;
  prevItem?: CardItem;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  currentIndex: number;
  isTransitioning: boolean;
  onTransitionEnd: () => void;
  canSwipeUp: boolean;
  canSwipeDown: boolean;
}

export const CardStack: React.FC<CardStackProps> = ({
  currentItem,
  nextItem,
  prevItem,
  onSwipeUp,
  onSwipeDown,
  currentIndex,
  isTransitioning,
  onTransitionEnd,
  canSwipeUp,
  canSwipeDown,
}) => {
  return (
    <View style={styles.container}>
      {nextItem && (
        <View style={[styles.cardContainer, styles.backgroundCard]}>
          <SwipeableCard
            index={currentIndex + 1}
            isBackground={true}
            onAnimationComplete={onTransitionEnd}
          >
            {nextItem.children}
          </SwipeableCard>
        </View>
      )}

      {prevItem && (
        <View style={[styles.cardContainer, styles.backgroundCard]}>
          <SwipeableCard
            index={currentIndex - 1}
            isBackground={true}
          >
            {prevItem.children}
          </SwipeableCard>
        </View>
      )}

      <View style={styles.cardContainer}>
        <SwipeableCard
          onSwipeUp={onSwipeUp}
          onSwipeDown={onSwipeDown}
          canSwipeUp={canSwipeUp}
          canSwipeDown={canSwipeDown}
          index={currentIndex}
        >
          {currentItem.children}
        </SwipeableCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundCard: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
});
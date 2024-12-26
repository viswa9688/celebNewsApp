import { useState, useCallback } from 'react';
import type { NewsItem } from '../types';

interface UseNewsNavigationProps {
  newsItems: NewsItem[];
  initialIndex: number;
}

export const useNewsNavigation = ({ newsItems, initialIndex }: UseNewsNavigationProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentItem = newsItems[currentIndex];
  const nextItem = currentIndex < newsItems.length - 1
    ? newsItems[currentIndex + 1]
    : undefined;
  const prevItem = currentIndex > 0
    ? newsItems[currentIndex - 1]
    : undefined;

  const handleSwipeUp = useCallback(() => {
    if (nextItem && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
    }
  }, [nextItem, isTransitioning]);

  const handleSwipeDown = useCallback(() => {
    if (prevItem && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
    }
  }, [prevItem, isTransitioning]);

  const handleTransitionEnd = useCallback(() => {
    requestAnimationFrame(() => {
      setIsTransitioning(false);
    });
  }, []);

  return {
    currentIndex,
    currentItem,
    nextItem,
    prevItem,
    handleSwipeUp,
    handleSwipeDown,
    isTransitioning,
    handleTransitionEnd,
  };
};
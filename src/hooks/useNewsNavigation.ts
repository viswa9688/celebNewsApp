import { useState, useCallback } from 'react';
import { NewsItem } from '../types';

interface UseNewsNavigationProps {
  newsItems: NewsItem[];
  initialIndex: number;
}

export const useNewsNavigation = ({ newsItems, initialIndex }: UseNewsNavigationProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentItem = newsItems[currentIndex];
  const nextItem = currentIndex < newsItems.length - 1 ? newsItems[currentIndex + 1] : undefined;
  const prevItem = currentIndex > 0 ? newsItems[currentIndex - 1] : undefined;

  const handleSwipeUp = useCallback(() => {
    if (currentIndex < newsItems.length - 1) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, [currentIndex, newsItems.length]);

  const handleSwipeDown = useCallback(() => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentIndex]);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return {
    currentItem,
    nextItem,
    prevItem,
    handleSwipeUp,
    handleSwipeDown,
    currentIndex,
    isTransitioning,
    handleTransitionEnd,
  };
};
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

interface SwipeableCardProps {
  index: number;
  isBackground?: boolean;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  canSwipeUp?: boolean;
  canSwipeDown?: boolean;
  children: React.ReactNode;
  onAnimationComplete?: () => void;
  onSwipeRight?: () => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  onSwipeUp,
  onSwipeDown,
  canSwipeUp,
  canSwipeDown,
  children,
  onSwipeRight,
}) => {
  const lastSwipeTime = useRef(Date.now());

  const handleGestureEvent = (event: any) => {
    const now = Date.now();
    const timeSinceLastSwipe = now - lastSwipeTime.current;

    if (event.nativeEvent.state === State.END && timeSinceLastSwipe > 300) {
      if (event.nativeEvent.translationX > 100) {
        onSwipeRight && onSwipeRight();
        lastSwipeTime.current = now;
      } else if (event.nativeEvent.translationY < -100 && canSwipeUp) {
        onSwipeUp && onSwipeUp();
        lastSwipeTime.current = now;
      } else if (event.nativeEvent.translationY > 100 && canSwipeDown) {
        onSwipeDown && onSwipeDown();
        lastSwipeTime.current = now;
      }
    }
  };

  return (
    <PanGestureHandler onHandlerStateChange={handleGestureEvent}>
      <View style={styles.card}>
        {children}
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default React.memo(SwipeableCard);
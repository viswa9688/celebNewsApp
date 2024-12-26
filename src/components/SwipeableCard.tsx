import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

interface SwipeableCardProps {
  index: number;
  isBackground?: boolean;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  canSwipeUp?: boolean;
  canSwipeDown?: boolean;
  onAnimationComplete?: () => void;
  children: React.ReactNode;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  onSwipeUp,
  onSwipeDown,
  canSwipeUp,
  canSwipeDown,
  children,
}) => {
  // Implement swipe logic here using PanGestureHandler or similar

  return (
    <PanGestureHandler
      onGestureEvent={(event) => {
        // Handle swipe gestures
        if (event.nativeEvent.translationY < -50 && canSwipeUp) {
          onSwipeUp && onSwipeUp();
        } else if (event.nativeEvent.translationY > 50 && canSwipeDown) {
          onSwipeDown && onSwipeDown();
        }
      }}
    >
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
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default React.memo(SwipeableCard);
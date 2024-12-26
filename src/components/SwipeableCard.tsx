import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_HEIGHT * 0.2;

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  canSwipeUp?: boolean;
  canSwipeDown?: boolean;
  index: number;
  isBackground?: boolean;
  onAnimationComplete?: () => void;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeUp,
  onSwipeDown,
  canSwipeUp = true,
  canSwipeDown = true,
  index,
  isBackground = false,
  onAnimationComplete,
}) => {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(isBackground ? 0.95 : 1);
  const opacity = useSharedValue(isBackground ? 0.8 : 1);

  useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 300,
    });
    scale.value = withSpring(isBackground ? 0.95 : 1, {
      damping: 20,
      stiffness: 300,
    });
    opacity.value = withTiming(isBackground ? 0.8 : 1, {
      duration: 200,
    }, () => {
      if (onAnimationComplete) {
        runOnJS(onAnimationComplete)();
      }
    });
  }, [index, isBackground]);

  const gesture = Gesture.Pan()
    .activeOffsetY([-10, 10])
    .onUpdate((event) => {
      if ((!canSwipeUp && event.translationY < 0) ||
        (!canSwipeDown && event.translationY > 0)) {
        return;
      }
      translateY.value = event.translationY;

      const progress = Math.abs(event.translationY) / SCREEN_HEIGHT;
      opacity.value = 1 - progress * 0.3;
      scale.value = 1 - progress * 0.05;
    })
    .onEnd((event) => {
      const velocity = event.velocityY;
      const isQuickSwipe = Math.abs(velocity) > 1000;

      if ((translateY.value < -SWIPE_THRESHOLD || (isQuickSwipe && velocity < 0)) && canSwipeUp) {
        translateY.value = withSpring(-SCREEN_HEIGHT, {
          velocity,
          damping: 50,
          stiffness: 300,
        }, () => {
          if (onSwipeUp) {
            runOnJS(onSwipeUp)();
          }
        });
      } else if ((translateY.value > SWIPE_THRESHOLD || (isQuickSwipe && velocity > 0)) && canSwipeDown) {
        translateY.value = withSpring(SCREEN_HEIGHT, {
          velocity,
          damping: 50,
          stiffness: 300,
        }, () => {
          if (onSwipeDown) {
            runOnJS(onSwipeDown)();
          }
        });
      } else {
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 300,
        });
        scale.value = withSpring(isBackground ? 0.95 : 1, {
          damping: 20,
          stiffness: 300,
        });
        opacity.value = withTiming(isBackground ? 0.8 : 1, {
          duration: 200
        });
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, rStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});
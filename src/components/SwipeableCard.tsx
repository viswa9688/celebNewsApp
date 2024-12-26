import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
  withTiming,
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
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeUp,
  onSwipeDown,
  canSwipeUp = true,
  canSwipeDown = true,
  index,
}) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const context = useSharedValue({ y: 0 });

  // Reset position when index changes
  useEffect(() => {
    translateY.value = withTiming(0, { duration: 0 });
    opacity.value = withTiming(1, { duration: 300 });
  }, [index]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      if ((!canSwipeUp && event.translationY < 0) ||
        (!canSwipeDown && event.translationY > 0)) {
        return;
      }
      translateY.value = event.translationY + context.value.y;
      // Fade out as card moves
      opacity.value = withTiming(1 - Math.abs(event.translationY) / SCREEN_HEIGHT);
    })
    .onEnd(() => {
      if (translateY.value < -SWIPE_THRESHOLD && canSwipeUp) {
        opacity.value = withTiming(0, { duration: 200 });
        translateY.value = withSpring(-SCREEN_HEIGHT, {
          damping: 50,
          velocity: 1,
        }, () => {
          runOnJS(onSwipeUp)();
        });
      } else if (translateY.value > SWIPE_THRESHOLD && canSwipeDown) {
        opacity.value = withTiming(0, { duration: 200 });
        translateY.value = withSpring(SCREEN_HEIGHT, {
          damping: 50,
          velocity: 1,
        }, () => {
          runOnJS(onSwipeDown)();
        });
      } else {
        opacity.value = withTiming(1, { duration: 200 });
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
        });
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
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
  },
});
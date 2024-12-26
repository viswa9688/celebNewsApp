import { useRef } from 'react';
import { PanResponder, PanResponderGestureState } from 'react-native';

export const useSwipeNavigation = (
  onSwipeUp: () => void,
  onSwipeDown: () => void,
  threshold = 50
) => {
  return useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 10,
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        const { dy } = gestureState;
        if (Math.abs(dy) < threshold) return;
        
        if (dy < 0) {
          onSwipeUp();
        } else {
          onSwipeDown();
        }
      },
    })
  ).current;
};
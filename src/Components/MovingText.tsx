// import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import React, {useEffect} from 'react';

interface Props {
  text: string;
  animationThreshold: number;
  style?: any;
}
const MovingText = ({text, animationThreshold, style}: Props) => {
  const translateX = useSharedValue(0);
  const shouldAnimate = text?.length >= animationThreshold;
  const textWidth = text?.length * 3;

  useEffect(() => {
    if (!shouldAnimate) return;
    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, {
          duration: 5000,
          easing: Easing.linear,
        }),
        -1,
        true,
      ),
    );
  }, [text, translateX, animationThreshold, shouldAnimate, textWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  return (
    <Animated.Text
      numberOfLines={1}
      style={[animatedStyle, style, shouldAnimate && {width: 9999}]}>
      {text}
    </Animated.Text>
  );
};

export default MovingText;

// const styles = StyleSheet.create({});

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
import {StyleSheet} from 'react-native';

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
    // console.log(translateX, 'translateX');
    if (!shouldAnimate) {
      return;
    }
    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-20, {
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
      style={[animatedStyle, style, styles.text]}>
      {text}
    </Animated.Text>
  );
};

export default MovingText;

const styles = StyleSheet.create({
  text: {width: 'auto'},
});

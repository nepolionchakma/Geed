import { TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  size?: number;
  color?: string;
  onPress?: () => void;
  name: string;
}
export const PreviousButton = ({
  size = 40,
  color = 'white',
  onPress,
  name,
}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export const PlayPauseButton = ({
  size = 40,
  color = 'white',
  onPress,
  name,
}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export const NextButton = ({
  size = 40,
  color = 'white',
  onPress,
  name,
}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

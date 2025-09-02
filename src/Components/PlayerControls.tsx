import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

interface PlayerControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  onPlay,
  onPause,
  onNext,
  onPrevious,
}) => {
  return (
    <View style={styles.controlsContainer}>
      <Button title="Previous" onPress={onPrevious} />
      <Button title="Play" onPress={onPlay} />
      <Button title="Pause" onPress={onPause} />
      <Button title="Next" onPress={onNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default PlayerControls;

import {Modal, StyleSheet, View} from 'react-native';
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import TrackPlayer, {Track} from 'react-native-track-player';
import QueueSongsCard from './QueueSongsCard';

interface QueueSongsListProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}
const QueueSongsList: FC<QueueSongsListProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [queueSongs, setQueueSongs] = useState<Track[] | null>(null);
  useEffect(() => {
    (async () => {
      await TrackPlayer.getQueue().then(queue => {
        setQueueSongs(queue);
      });
    })();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={() => {
        setIsModalOpen(!isModalOpen);
        console.log('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.bg}>
          <QueueSongsCard selectedSongsViaCategory={queueSongs} />
        </View>
      </View>
    </Modal>
  );
};

export default QueueSongsList;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(252, 0, 0, 1)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bg: {
    height: '70%',
    width: '90%',
    backgroundColor: '#21223def',
    borderRadius: 10,
    alignItems: 'center',
  },
});

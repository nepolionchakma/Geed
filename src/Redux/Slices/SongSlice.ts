import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define Song type (ensure consistency with SongType in your types)
interface Song {
  id: number;
  title: string;
  artist: string;
  artwork: string;
  url: string;
}

// Define initial state using Song type
const initialState = {
  songs: [
    {
      id: 1,
      title: 'Song 1',
      artist: 'Artist 1',
      artwork:
        'https://www.shutterstock.com/image-vector/retro-futuristic-background-1980s-style-600nw-487600702.jpg',
      url: 'https://music.com.bd/download/Music/F/Fuad/BONNO/13%20-%20Fuad%20Ft.%20Upol%20-%20Tor%20Jonno%20Bonno%20(music.com.bd).mp3',
    },
  ],
  isPlaying: false,
  progress: 0,
  isReady: false,
};

// Create slice with typed actions and reducers
export const songSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setSong: (state, action: PayloadAction<Song[]>) => {
      const newSongs = action.payload;
      state.songs = newSongs;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setIsReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
  },
});

export const {setSong, setIsPlaying, setProgress, setIsReady} =
  songSlice.actions;

export default songSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SongType} from '../../Types/SongsType';

// Define Song type (ensure consistency with SongType in your types)
interface SongState {
  songs: SongType[];
  isPlaying: boolean;
  progress: number;
  isReady: boolean;
}

// Define initial state using Song type
const initialState: SongState = {
  songs: [],
  isPlaying: false,
  progress: 0,
  isReady: false,
};

// Create slice with typed actions and reducers
export const songSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setSong: (state, action: PayloadAction<SongType[]>) => {
      if (state.songs !== action.payload) {
        state.songs = action.payload;
      }
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
    resetSong: state => {
      state.songs = [];
    },
  },
});

export const {setSong, setIsPlaying, setProgress, setIsReady, resetSong} =
  songSlice.actions;

export default songSlice.reducer;

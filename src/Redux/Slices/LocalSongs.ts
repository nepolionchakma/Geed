import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SongType} from '../../Types/SongsType';

interface SelectedSongsCategoryState {
  localSongs: SongType[];
  isLoading: boolean;
}

const initialState: SelectedSongsCategoryState = {
  localSongs: [],
  isLoading: false,
};

export const localSongs = createSlice({
  name: 'localSongs',
  initialState,
  reducers: {
    setLocalSongs: (state, action: PayloadAction<SongType[]>) => {
      if (state.localSongs !== action.payload) {
        state.localSongs = action.payload;
      }
    },
  },
});

export const {setLocalSongs} = localSongs.actions;
export default localSongs.reducer;

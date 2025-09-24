import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SongType} from '../../Types/SongsType';

interface SelectedSongsCategoryState {
  selectedSongsCategory: string;
  selectedSongsViaCategory: SongType[];
  isLoading: boolean;
}

const initialState: SelectedSongsCategoryState = {
  selectedSongsCategory: 'Recommended Songs',
  selectedSongsViaCategory: [],
  isLoading: false,
};

export const selectedSongsCategory = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {
    setSelectedSongsCategory: (state, action: PayloadAction<string>) => {
      console.log(action, 'setSelectedSongsCategory action');
      if (state.selectedSongsCategory !== action.payload) {
        state.selectedSongsCategory = action.payload;
      }
    },
    setSelectedSongsViaCategory: (state, action: PayloadAction<SongType[]>) => {
      console.log(action.payload, 'setSelectedSongsViaCategory action.payload');
      state.selectedSongsViaCategory = action.payload;
    },
  },
});

export const {setSelectedSongsCategory, setSelectedSongsViaCategory} =
  selectedSongsCategory.actions;
export default selectedSongsCategory.reducer;

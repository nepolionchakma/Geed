import {configureStore} from '@reduxjs/toolkit';
import songSlice from '../Slices/SongSlice';
import {selectedSongsCategory} from '../Slices/SelectedCategory';
import {localSongs} from '../Slices/LocalSongs';

export const store = configureStore({
  reducer: {
    tracks: songSlice,
    selectedSongsCategory: selectedSongsCategory.reducer,
    localSongs: localSongs.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

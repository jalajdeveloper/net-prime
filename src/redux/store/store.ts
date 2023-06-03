import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from '../slices/movies.slice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

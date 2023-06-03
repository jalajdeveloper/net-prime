import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  movieType,
  moviesState,
  filterPayload,
  orderPayload,
} from '../../types';

const initialState: moviesState = {
  movies: [],
  movieLanguage: '',
  filterType: '',
  yearOfRelease: '',
  order: 'random',
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies: (state, action: PayloadAction<movieType[]>) => {
      const movieArray: movieType[] = [...state.movies, ...action.payload];
      if (action.payload.length === 0) {
        state.movies = [];
        return;
      }
      const jsonMovies = movieArray.map((movie: movieType) =>
        JSON.stringify(movie)
      );
      const uniqueSet = new Set(jsonMovies);
      const uniqueMovies = Array.from(uniqueSet).map((movie) =>
        JSON.parse(movie)
      );

      state.movies = uniqueMovies;
    },
    sortMoviesByRating: (state, action: PayloadAction<orderPayload>) => {
      const {
        payload: { order },
      } = action;
      state.order = order;
    },

    movieFilters: (state, action: PayloadAction<filterPayload>) => {
      const { payload } = action;
      state.filterType = payload?.filterType;
      if (payload.movieLanguage) {
        state.movieLanguage = payload.movieLanguage;
      } else if (payload.yearOfRelease) {
        state.yearOfRelease = payload.yearOfRelease;
      }
    },
  },
});

export const { addMovies, sortMoviesByRating, movieFilters } =
movieSlice.actions;

export default movieSlice.reducer;

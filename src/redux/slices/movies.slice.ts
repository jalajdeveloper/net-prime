import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { movieType } from '../../types';

export interface CounterState {
    movies: movieType[]
}

const initialState: CounterState = {
  movies: [],
}

export const counterSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies: (state, action: PayloadAction<movieType[]>) => {
      const movieArray: movieType[] = [...state.movies , ...action.payload];
      
      const jsonMovies = movieArray.map((movie: movieType) => JSON.stringify(movie))
      const uniqueSet = new Set(jsonMovies)
      const uniqueMovies = Array.from(uniqueSet).map(movie => JSON.parse(movie)) 

       state.movies = uniqueMovies;
    },
  
  },
})

export const { addMovies } = counterSlice.actions

export default counterSlice.reducer
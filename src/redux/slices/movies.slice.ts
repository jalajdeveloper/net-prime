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
       state.movies = [...state.movies , ...action.payload]
    },
  
  },
})

export const { addMovies } = counterSlice.actions

export default counterSlice.reducer
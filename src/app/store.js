import { configureStore } from '@reduxjs/toolkit';
import { MoviesReducer } from '../utilities/movieApi';

export const store = configureStore({
  reducer: {
    movies: MoviesReducer,
  },
});
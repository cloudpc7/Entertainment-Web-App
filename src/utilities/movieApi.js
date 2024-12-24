import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mapImage } from './mapImage';
import { db } from '../firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async() => {
    try {
        const q = query(collection(db,'movies'), where ('title','!=',''));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty) {
            console.log(('No documents found in the "movies" collection.'));
            return [];
        }
        const movies = [];
        querySnapshot.forEach((doc) => {
            movies.push(doc.data());
        });
        return movies;

    } catch (error) {
        console.error('Error fetching movies from Firestore: ', error);
        throw error;
    }
})

const initialState = {
    moviesArray : [],
    isLoading: false,
    errMsg: ''
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
        .addCase(fetchMovies.pending, (state) => {
            state.isLoading = true;
            state.errMsg = '';
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.isLoading = false;
            state.moviesArray = action.payload;
        })
        .addCase(fetchMovies.rejected, (state, action) => {
            state.isLoading = false;
            state.errMsg = action.payload;
        });
    })
});

export const MoviesReducer =  moviesSlice.reducer;

export const movies = (state) => {
    return state.movies.moviesArray;
}
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";


export const fetchFilmList = createAsyncThunk('film/fetchFilmList', async () => {
    const { data } = await axios.get("/film/film_list")
    return data;
})

const initialState = {
    data: null,
    status: 'loading',
};



const filmListSlice = createSlice({
    name: 'filmList',
    initialState,
    extraReducers: {
        [fetchFilmList.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchFilmList.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchFilmList.rejected]: (state, action) => {
            state.status = 'error';
            state.data = action.payload;
        }
    }
});

export const filmListSelector = {
    getFilmList: (state) => state.filmList.data
};


export const filmListReducer = filmListSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";


export const fetchUploadFilm = createAsyncThunk('auth/fetchUploadFilm', async(params)=>{
    const {data} = await axios.post ('/film/post_film',params,{
        headers:{
            authorization: params.token,
            'Content-Type':'multipart/form-data'
        }
    });
    return data
})

const initialState = {
    data: null,
    status:'loading',
};



const uploadFilmSlice = createSlice({
    name:'register',
    initialState,
    extraReducers:{
        [fetchUploadFilm.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchUploadFilm.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchUploadFilm.rejected]: (state,action) => {
            state.status = 'error';
            state.data = action.payload;
        }
    }
});

export const isUploaded = (state) => state.uploadedFilm.data;

export const uploadFilmReducer = uploadFilmSlice.reducer;
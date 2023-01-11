import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../axios";


export const createUserComment = createAsyncThunk("comment/createUserComment", async(params) =>{
    const { data } = await axios.post('/comments/newComment',params,{
        headers:{
            authorization: params.token
        }
    });
    return data
})

export const fetchFilmComments = createAsyncThunk("comment/fetchFilmComments", async(params) =>{
    const { data } = await axios.get('/comments/comments/'+params.id);
    return data
})

const initialState = {
    data:null,
    status: 'loading'
}


const createUserCommentSlice = createSlice({
    name:'createUserComment',
    initialState,
    extraReducers:{
        [createUserComment.pending]: (state) =>{
            state.status='loading';
            state.data= null;
        },
        [createUserComment.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [createUserComment.rejected]: (state, action) => {
            state.status = 'error';
            state.data = action.payload;
        }
    }

})

const filmCommentSlice = createSlice({
    name:'filmCommentSlice',
    initialState,
    extraReducers:{
        [fetchFilmComments.pending]: (state) =>{
            state.status='loading';
            state.data= null;
        },
        [fetchFilmComments.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchFilmComments.rejected]: (state, action) => {
            state.status = 'error';
            state.data = action.payload;
        }
    }

})

export const isCommentCreated ={
    getCreationStatus: (state) => state.commentCreation.data
}

export const filmCommentsSelector ={
    getFilmComments: (state) => state.comments.data
}

export const createUserCommentReducer = createUserCommentSlice.reducer;

export const filmCommentsReducer = filmCommentSlice.reducer;
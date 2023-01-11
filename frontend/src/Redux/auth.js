import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchAuthUser = createAsyncThunk('auth/fetchAuthUser', async(params)=>{
    const {data} = await axios.post('/user/login', params);
    return data;
});

export const fetchRegisterUser = createAsyncThunk('auth/fetchRegisterUser', async(params)=>{
    const {data} = await axios.post ('/user/registration', params);
    return data
})

export const checkAuthUser = createAsyncThunk('auth/checkAuthUser', async(params)=>{
    const {data} = await axios.get('/user/auth', {
        headers:{
            authorization: params
        }
    })
    return data
});

const initialState = {
    data: null,
    status:'loading',
};


const authSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers:{
        [fetchAuthUser.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthUser.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthUser.rejected]: (state,action) => {
            state.status = 'error';
            state.data = action.payload;
        }
    }
});

const registerSlice = createSlice({
    name:'register',
    initialState,
    extraReducers:{
        [fetchRegisterUser.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegisterUser.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegisterUser.rejected]: (state,action) => {
            state.status = 'error';
            state.data = action.payload;
        }
    }
});

const checkAuthSlice = createSlice({
    name:'checkAuth',
    initialState,
    reducer:{},
    extraReducers:{
        [checkAuthUser.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [checkAuthUser.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [checkAuthUser.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        }
    }
});

export const selectIsAuth = (state) => state.auth.data;

export const selectRegistered = (state) => state.register.data;

export const selectAuth = (state) => state.checkAuth.data;

export const registerReducer = registerSlice.reducer;

export const authReducer = authSlice.reducer;

export const checkAuthReducer = checkAuthSlice.reducer;
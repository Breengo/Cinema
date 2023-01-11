import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const updateUserInfo = createAsyncThunk('auth/updateUserInfo', async(params)=>{
    const {data} = await axios.put('/user/changeUserInfo',params,
    {
        headers:{
            authorization: params.token
        }    
    })
    return data
});


const initialState = {
    changePassword: false,
    changeProfileImage: false,
    changeEmail: false,
    status: "loading",
    data:null
}


const changeInfo = createSlice({
    name: 'changeInfo',
    initialState: initialState,
    reducers: {
        showChangePassword: (state) => {
            state.changePassword = true;
        },

        hideChangePassword: (state) => {
            state.changePassword = false;
        },
        showChangeProfileImage: (state) => {
            state.changeProfileImage = true;
        },
        hideChangeProfileImage: (state) => {
            state.changeProfileImage = false;
        },
        showChangeEmail: (state) => {
            state.changeEmail = true;
        },
        hideChangeEmail: (state) => {
            state.changeEmail = false;
        }
    }

});

const updateData = createSlice({
    name:'updateData',
    initialState,
    extraReducers:{
        [updateUserInfo.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [updateUserInfo.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [updateUserInfo.rejected]: (state,action) => {
            state.status = 'error';
            state.data = action.payload;
        }
    }
});


export const changePasswordSelector = {
    getChangePassword: (state) => state.change.changePassword
};

export const changeEmailSelector = {
    getChangeEmail: (state) => state.change.changeEmail
};

export const changeProfileImageSelector = {
    getChangeImage: (state) => state.change.changeProfileImage
};

export const { showChangePassword, hideChangePassword, showChangeProfileImage, hideChangeProfileImage,  showChangeEmail, hideChangeEmail } = changeInfo.actions;

export const changeInfoReducer = changeInfo.reducer;

export const selectChanged = (state) => state.updateData.data;

export const updateDataReducer = updateData.reducer;

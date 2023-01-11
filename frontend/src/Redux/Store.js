import { configureStore} from '@reduxjs/toolkit';
import loginWindowSlice from './WindowsManagementSlice.js';
import { authReducer,registerReducer,checkAuthReducer } from './auth.js';
import {changeInfoReducer, updateDataReducer} from './changeUserInfoSlice';
import { uploadFilmReducer } from './contentFunctions.js';
import { filmListReducer } from './filmList.js';
import { createUserCommentReducer } from './commentSlice.js';
import { filmCommentsReducer } from './commentSlice.js';


const store = configureStore({
    reducer: {
        login:loginWindowSlice.reducer,
        auth:authReducer,
        register:registerReducer,
        checkAuth:checkAuthReducer,
        change:changeInfoReducer,
        updateData:updateDataReducer,
        uploadedFilm:uploadFilmReducer,
        filmList:filmListReducer,
        commentCreation:createUserCommentReducer,
        comments:filmCommentsReducer
    },
});

export default store;
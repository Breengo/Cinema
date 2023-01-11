import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    loginWindow: false,
    registrationWindow: false,
    searchLine: false
}


const loginWindowSlice = createSlice({
    name: 'loginWindow',
    initialState: initialState,
    reducers: {
        showLoginWindow: (state) => {
            state.loginWindow = true;
        },

        hideLoginWindow: (state) => {
            state.loginWindow = false;
        },
        showRegistrationWindow: (state) => {
            state.registrationWindow = true;
        },
        hideRegistrationWindow: (state) => {
            state.registrationWindow = false;
        },
        showSearchLine: (state) => {
            state.searchLine = true;
        },
        hideSearchLine: (state) => {
            state.searchLine = false;
        }
    }

});


export const loginWindowSelector = {
    getLoginWindow: (state) => state.login.loginWindow
};

export const registrationWindowSelector = {
    getRegistrationWindow: (state) => state.login.registrationWindow
};

export const searchLineSelector = {
    getSearchLine: (state) => state.login.searchLine
};

export const { showLoginWindow, hideLoginWindow, showRegistrationWindow, hideRegistrationWindow,  showSearchLine, hideSearchLine } = loginWindowSlice.actions;

export default loginWindowSlice;

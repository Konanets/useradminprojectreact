import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {authService} from "../../services";
import {IAuthInitialStore, IUser} from "../../types";

const initialState: IAuthInitialStore = {
    user: null,
    userLoading: true,
    authorized: false,
    error: '',
    isLoading: 'none'
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoading = 'pending'
        },
        loginSuccess: (state) => {
            state.authorized = true
            state.error = ''
            state.isLoading = 'success'
            state.userLoading = false
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.authorized = false
            state.error = action.payload
            state.isLoading = 'failure'
            state.userLoading = false
        },
        userLoading: (state) => {
            state.userLoading = true
        },
        saveUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.authorized = true
            state.isLoading = 'none'
            state.error = ''
            state.userLoading = false
        },

        saveUserError: (state) => {
            state.userLoading = false
        },
        logOut: (state) => {
            authService.removeTokens()
            state.user = null
            state.authorized = false
            state.isLoading = 'none'
            state.userLoading = false
            state.error = ''
        },
        activateUser: (state) => {
            state.error = ''
        },
        activateUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})


const {
    reducer: authReducer, actions: {
        login,
        loginSuccess,
        loginFailure,
        saveUser,
        logOut,
        saveUserError,
        userLoading,
        activateUser,
        activateUserFailure
    }
} = authSlice

const authActions = {
    login,
    loginSuccess,
    loginFailure,
    saveUser,
    logOut,
    saveUserError,
    userLoading,
    activateUser,
    activateUserFailure
}

export {authActions, authReducer}
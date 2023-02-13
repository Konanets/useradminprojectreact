import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IGetUsersResponse, IUser} from "../../types";

interface IUsersInitialStore {
    count: number,
    previous: string | null,
    next: string | null,
    users: IUser[] | null,
    error: string,
    isLoading: 'pending' | 'failure' | 'success' | 'none' | 'loadNew'
}

const initialState: IUsersInitialStore = {
    count: 0,
    next: null,
    previous: null,
    users: null,
    error: '',
    isLoading: 'none'
}

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        loadUsers: (state) => {
            state.isLoading = 'pending'
            state.error = ''
        },
        loadUsersSuccess: (state, action: PayloadAction<IGetUsersResponse>) => {
            state.isLoading = 'success'
            state.error = ''
            state.count = action.payload.count
            state.next = action.payload.next
            state.previous = action.payload.previous
            state.users = action.payload.results
        },
        loadUsersFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = 'failure'
            state.error = action.payload
        },
        createNewUser: (state) => {
            state.error = ''
            state.isLoading = 'none'
        },
        createNewUserSuccess: (state) => {
            state.error = ''
            state.isLoading = 'loadNew'
        },
        createNewUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = 'failure'
        }
    }
})


const {
    reducer: usersReducer, actions: {
        loadUsers,
        loadUsersSuccess,
        loadUsersFailure,
        createNewUserFailure,
        createNewUser,
        createNewUserSuccess
    }
} = usersSlice

const usersActions = {
    loadUsers,
    loadUsersSuccess,
    loadUsersFailure,
    createNewUserFailure,
    createNewUser,
    createNewUserSuccess
}

export {usersReducer, usersActions}
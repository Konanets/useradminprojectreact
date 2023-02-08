import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IGroup, IGroupRes} from "../../types";

interface IInitialState {
    count: number
    previous: string | null,
    next: string | null,
    groups: IGroup[],
    loading: 'pending' | 'success' | 'failure' | 'none' | 'creating'
}

const initialState: IInitialState = {
    groups: [],
    loading: 'none',
    count: 0,
    next: null,
    previous: null
}

const groupSlice = createSlice(({
    name: 'groupSlice',
    initialState,
    reducers: {
        loadGroups: (state) => {
            state.loading = 'pending'
        },
        loadGroupsSuccess: (state, action: PayloadAction<IGroupRes>) => {
            state.loading = 'success'
            state.groups = action.payload.results
            state.count = action.payload.count
            state.next = action.payload.next
            state.previous = action.payload.previous
        },
        loadGroupsFailure: (state) => {
            state.loading = 'failure'
        },
        createNewGroup: (state) => {
            state.loading = 'creating'
        },
        createNewGroupSuccess: (state, action: PayloadAction<IGroup>) => {
            state.loading = 'success'
            state.groups.push(action.payload)
        }
    }
}))


const {
    reducer: groupReducer, actions: {
        loadGroupsSuccess,
        loadGroupsFailure,
        loadGroups,
        createNewGroup,
        createNewGroupSuccess
    }
} = groupSlice

const groupActions = {
    loadGroupsSuccess,
    loadGroupsFailure,
    loadGroups,
    createNewGroup,
    createNewGroupSuccess
}

export {groupActions, groupReducer}
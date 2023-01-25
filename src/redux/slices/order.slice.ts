import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IGetOrderResponse, IOrderInitialState} from "../../types";


const initialState: IOrderInitialState = {
    orders: null,
    loading: "none"
}

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        loadOrders: (state) => {
            state.loading = 'pending'
        },
        loadOrdersSuccess: (state, action: PayloadAction<IGetOrderResponse>) => {
            state.orders = action.payload
            state.loading = 'success'
        },
        loadOrdersFailure: (state) => {
            state.loading = 'failure'
        }
    }
})


const {
    reducer: orderReducer, actions: {
        loadOrdersSuccess,
        loadOrders,
        loadOrdersFailure
    }
} = orderSlice

const orderActions = {
    loadOrdersSuccess,
    loadOrders,
    loadOrdersFailure
}

export {orderActions, orderReducer}
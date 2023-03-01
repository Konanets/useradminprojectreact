import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IComment, IGetOrderResponse, IOrderInitialState} from "../../types";


const initialState: IOrderInitialState = {
    orders: null,
    loading: "none",
    changed: false
}

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        loadOrders: (state) => {
            state.loading = 'pending'
            state.changed = false
        },
        loadOrdersSuccess: (state, action: PayloadAction<IGetOrderResponse>) => {
            state.orders = action.payload
            state.loading = 'success'
            state.changed = false
        },
        loadOrdersFailure: (state) => {
            state.loading = 'failure'
            state.changed = false
        },
        sendComment: (state) => {
            state.changed = false
        },
        sendCommentSuccess: (state, action: PayloadAction<IComment>) => {
            state.changed = false
            if (!!state.orders) {
                state.orders.results = state.orders.results.map((order) => {
                    if (order.id === action.payload.order_id) {
                        order.comments.push(action.payload)
                    }
                    return order
                });

            }
        },
        sendCommentFailure: (state) => {
            state.loading = 'failure'
            state.changed = false
        },
        edit: (state) => {
            state.changed = false
        },
        editSuccess: (state) => {
            state.changed = true
        },
        editFailure: (state) => {
            state.changed = false
        }
    }
})


const {
    reducer: orderReducer, actions: {
        loadOrdersSuccess,
        loadOrders,
        loadOrdersFailure,
        sendComment,
        sendCommentSuccess,
        editFailure,
        editSuccess,
        edit,
        sendCommentFailure
    }
} = orderSlice

const orderActions = {
    loadOrdersSuccess,
    loadOrders,
    loadOrdersFailure,
    sendComment,
    sendCommentSuccess,
    edit,
    editFailure,
    editSuccess,
    sendCommentFailure
}

export {orderActions, orderReducer}
import * as Effects from 'redux-saga/effects'
import {AxiosError, isAxiosError} from "axios";

import {AxiosRes, orderService} from "../../services";
import {IComment, IEditOrder, IGetOrderResponse, IOrder, IOrderParams} from "../../types";
import {orderActions} from "../slices";

const takeLatest: any = Effects.takeLatest;

function* loadOrdersByPage({query}: { query: IOrderParams }) {
    try {
        const {data}: { data: IGetOrderResponse } = yield Effects.call((): AxiosRes<IGetOrderResponse> => orderService.getOrderList(query));
        yield Effects.put(orderActions.loadOrdersSuccess(data));
    } catch (error) {
        if (isAxiosError(error)) {
            const serverError = error as AxiosError<{ detail: string }>;
            if (serverError && serverError.response) {
                yield Effects.put(orderActions.loadOrdersFailure())
            }
        }
    }
}

function* sendComment({data: {comment, id}}: { data: { comment: string, id: number } }) {
    try {
        yield Effects.call((): AxiosRes<IComment> => orderService.postOrderComment(comment, id));
        yield Effects.put(orderActions.sendCommentSuccess())
    } catch (error) {
        if (isAxiosError(error)) {
            const serverError = error as AxiosError<{ detail: string }>;
            if (serverError && serverError.response) {
                // yield Effects.put(authActions.loginFailure(serverError.response.data.detail))
            }
        }
    }
}

function* editOrder({data:{data,id}}: { data: { data: IEditOrder, id: number } }) {
    try {
        yield Effects.call((): AxiosRes<IOrder> => orderService.editOrder(data, id));
        yield Effects.put(orderActions.editSuccess())

    } catch (error) {
        if (isAxiosError(error)) {
            const serverError = error as AxiosError<{ detail: string }>;
            if (serverError && serverError.response) {
                yield Effects.put(orderActions.editFailure())
            }
        }
    }
}

function* loadOrder() {
    yield takeLatest(orderActions.loadOrders.type, loadOrdersByPage)
}

function* commentSaga() {
    yield takeLatest(orderActions.sendComment.type, sendComment)
}

function* editOrderSaga() {
    yield takeLatest(orderActions.edit.type, editOrder)
}


export {loadOrder, commentSaga, editOrderSaga}
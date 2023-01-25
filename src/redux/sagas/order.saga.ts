import * as Effects from 'redux-saga/effects'
import {AxiosError, isAxiosError} from "axios";

import {AxiosRes, orderService} from "../../services";
import {IGetOrderResponse, IOrderParams} from "../../types";
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


function* loadOrder() {
    yield takeLatest(orderActions.loadOrders.type, loadOrdersByPage)
}


export {loadOrder}
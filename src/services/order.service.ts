import {axiosInstance, AxiosRes} from "./axios.service";

import {urls} from "../configs";
import {IGetOrderResponse, IOrderParams} from "../types";

const orderService = {
    getOrderList: (params: IOrderParams = {}): AxiosRes<IGetOrderResponse> => axiosInstance.get(urls.orders.orders, {
        params
    })
}

export {orderService}
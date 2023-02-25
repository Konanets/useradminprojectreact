import {axiosInstance, AxiosRes} from "./axios.service";

import {urls} from "../configs";
import {IComment, IEditOrder, IGetOrderResponse, IOrder, IOrderParams, IStatistics} from "../types";

const orderService = {
    getOrderList: (params: IOrderParams = {}): AxiosRes<IGetOrderResponse> => axiosInstance.get(urls.orders.orders, {
        params
    }),
    postOrderComment: (comment: string, id: number): AxiosRes<IComment> => axiosInstance.post(urls.orders.orders + `/${id}` + urls.orders.comments, {
        comment: comment
    }),
    editOrder: (data: IEditOrder, id: number): AxiosRes<IOrder> => axiosInstance.patch(urls.orders.orders + `/${id}`, data),
    getOrdersStatistic: (): AxiosRes<IStatistics> => axiosInstance.get(urls.admin.statistic.orders)
}

export {orderService}
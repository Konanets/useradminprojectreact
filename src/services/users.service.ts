import {axiosInstance, AxiosRes} from "./axios.service";
import {ICreateUser, IGetUsersResponse, IStatistics, IUser} from "../types";
import {urls} from "../configs";

const usersService = {
    getUsersList: (page: number): AxiosRes<IGetUsersResponse> => axiosInstance.get(urls.admin.users + '?size=10', {
        params: {
            page
        }
    }),
    getUserToken: (id: number): AxiosRes<string> => axiosInstance.get(urls.admin.users + '/' + id + urls.admin.token),
    createNewUser: (data: ICreateUser): AxiosRes<IUser> => axiosInstance.post(urls.admin.users, data),
    banUser: (id: number): AxiosRes<IUser> => axiosInstance.patch(urls.admin.users + '/' + id + urls.admin.ban),
    unBanUser: (id: number): AxiosRes<IUser> => axiosInstance.patch(urls.admin.users + '/' + id + urls.admin.unban),
    getStatisticById: (id: number): AxiosRes<IStatistics> => axiosInstance.get(urls.admin.statistic.user + '/' + id)
}

export {usersService}
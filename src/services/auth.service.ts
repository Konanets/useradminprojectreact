import {axiosInstance, AxiosRes} from "./axios.service";

import {ILogin, ILoginTokens, IUser} from "../types";
import {urls} from "../configs";

const _accessToken = 'access'
const _refreshToken = 'refresh'

const authService = {
    login: (user: ILogin): AxiosRes<ILoginTokens> => axiosInstance.post(urls.auth.login, user),
    refresh: (refresh: string): AxiosRes<ILoginTokens> => axiosInstance.post(urls.auth.refresh, {refresh}),
    userData: (): AxiosRes<IUser> => axiosInstance.get(urls.users.my),
    saveTokens: ({access, refresh}: ILoginTokens) => {
        localStorage.setItem(_accessToken, access);
        localStorage.setItem(_refreshToken, refresh);
    },
    removeTokens: () => {
        localStorage.removeItem(_accessToken);
        localStorage.removeItem(_refreshToken);
    },
    getAccessToken: () => {
        return localStorage.getItem(_accessToken);
    },
    getRefreshToken: () => {
        return localStorage.getItem(_refreshToken);
    }
}

export {authService}
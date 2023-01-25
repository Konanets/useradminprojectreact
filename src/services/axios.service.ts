import axios, {AxiosResponse} from "axios";
import {createBrowserHistory} from "history";

import {baseURL} from "../configs";
import {authService} from "./auth.service";


export type AxiosRes<T> = Promise<AxiosResponse<T>>

const history = createBrowserHistory()

const axiosInstance = axios.create({
    baseURL
})

axiosInstance.interceptors.request.use((config) => {

    const access = authService.getAccessToken()

    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }

    return config
})

let isRefreshing = false;

axiosInstance.interceptors.response.use((config) => config, async (error) => {

    const refresh = authService.getRefreshToken()

    if (error.response?.status === 401 && refresh && !isRefreshing) {
        isRefreshing = true
        try {
            const {data} = await authService.refresh(refresh)
            authService.saveTokens(data)
        } catch (e) {
            authService.removeTokens()
            history.replace('/login')
        }
        isRefreshing = false

        return axiosInstance(error.config)
    }

    return Promise.reject(error)


})

export {axiosInstance, history}
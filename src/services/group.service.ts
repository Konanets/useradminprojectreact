import {IGroup, IGroupRes} from "../types";
import {axiosInstance, AxiosRes} from "./axios.service";
import {urls} from "../configs";

const groupService = {
    getGroups: (page:number): AxiosRes<IGroupRes> => axiosInstance.get(urls.groups.groups + '?size=10',{
        params:{
            page
        }
    }),
    createGroup: (name: string): AxiosRes<IGroup> => axiosInstance.post(urls.groups.groups, {
        name: name
    })
}

export {groupService}
import {LinearProgress} from "@mui/material";
import {FC, ReactNode} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../hooks";
import {authService} from "../../services";
import {authActions} from "../../redux/slices";

export interface IPrivateRoute {
    children?: ReactNode
}

const PrivateRouter: FC<IPrivateRoute> = ({children}) => {

    const navigation = useNavigate()

    const dispatch = useAppDispatch()

    const {authorized, userLoading} = useAppSelector(state => state.authReducer)

    if (authorized === false && userLoading === false) {
        return <Navigate to={'/login'}/>
    } else if (authorized === false && (!authService.getAccessToken() || !authService.getRefreshToken())) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            {userLoading ? <LinearProgress/> : <Outlet/>}
        </>
    );
};

export {PrivateRouter};
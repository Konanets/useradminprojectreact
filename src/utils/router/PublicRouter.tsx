import {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";

import {useAppSelector} from "../hooks";


const PublicRouter: FC = () => {

    const {authorized} = useAppSelector(state => state.authReducer)

    return (
        <>
            {authorized===false ? <Outlet/> : <Navigate to={'/orders'}/>}
        </>
    );
};

export {PublicRouter};
import {FC, useEffect} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";

import {useAppSelector} from "../hooks";


const PublicRouter: FC = () => {

    const {authorized} = useAppSelector(state => state.authReducer)
    const navigator = useNavigate()

    useEffect(() => {
        if (authorized === false) {
            navigator('/login')
        }
    }, [])

    return (
        <>
            {authorized === false ? <Outlet/> : <Navigate to={'/orders'}/>}
        </>
    );
};

export {PublicRouter};
import {FC, ReactNode} from "react";
import {useAppSelector} from "../hooks";
import {Navigate} from "react-router-dom";

interface IAdminRouterProps {
    children?: ReactNode
}

const AdminRouter: FC<IAdminRouterProps> = ({children}) => {

    const {user, isLoading} = useAppSelector(state => state.authReducer)

    if (!user && isLoading === 'failure') {
        return <Navigate to={'/login'}/>
    }
    console.log(435)
    return (
        <>
            {user!.is_superuser ? children : <Navigate to={'/orders'}/>}
        </>
    );
};

export {AdminRouter};
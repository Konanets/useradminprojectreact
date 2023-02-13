import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";

import {ActivatePage, AdminPage, LoginPage, OrdersPage} from "./pages";
import {AdminRouter, PrivateRouter, PublicRouter} from './utils'
import {MainLayout} from "./layouts";


function App() {
    return (
        <div>
            <Routes>
                <Route path={''} element={<PublicRouter/>}>
                    <Route path={'login'} element={<LoginPage/>}/>
                </Route>
                <Route element={<PrivateRouter/>}>
                    <Route path={''} element={<MainLayout/>}>
                        <Route path={'orders'} element={<OrdersPage/>}/>
                        <Route path={'admin'} element={<AdminRouter>
                            <AdminPage/>
                        </AdminRouter>}/>
                    </Route>
                </Route>
                <Route path={'activate/:token'} element={<ActivatePage/>}/>
            </Routes>
        </div>
    );
}

export default App;

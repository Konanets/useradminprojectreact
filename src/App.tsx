import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";


import {LoginPage, MainPage} from "./pages";
import {PrivateRouter, PublicRouter} from './utils'


function App() {
    return (
        <div>
            <Routes>
                <Route path={''} element={<PublicRouter/>}>
                    <Route path={'login'} element={<LoginPage/>}/>
                </Route>
                <Route path={''} element={<PrivateRouter/>}>
                    <Route path={'orders'} element={<MainPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;

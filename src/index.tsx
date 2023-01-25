import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {history} from "./services";
import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);





const BrowserRouterRender = () => (
    <BrowserRouter
        // @ts-expect-error
        history={history}>
        <App/>
    </BrowserRouter>
)


root.render(
    <Provider store={store}>
        <BrowserRouterRender/>
    </Provider>
);


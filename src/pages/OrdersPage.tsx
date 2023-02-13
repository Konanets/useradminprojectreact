import {useSearchParams} from "react-router-dom";
import {useState} from "react";

import {OrdersFilter, OrdersList} from "../components";
import {IOrderParams} from "../types";

const OrdersPage = () => {

    let query: IOrderParams = {}

    const [searchParams, setSearchParams] = useSearchParams();

    let current_page = searchParams.get('page')

     const [page, setPage] = useState((current_page && current_page.length) ? +current_page : 1)

    return (
        <div>
            <OrdersFilter query={query} setPage={setPage}/>
            <OrdersList query={query} setPage={setPage} page={page}/>
        </div>
    );
};

export {OrdersPage};
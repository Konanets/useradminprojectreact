import {Box} from "@mui/material";
import {FC, useState} from "react";

import {IOrder} from "../types";
import {Comments, EditOrder} from "./Actions";

interface IOrderActionsProps {
    order: IOrder
}

const OrderActions: FC<IOrderActionsProps> = ({order}) => {

    const [open, setOpen] = useState(false);


    return (
        <Box minWidth={'100%'} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Comments comments={order.comments} id={order.id} manager_id={!!order.manager ? order.manager.user : 0}/>
            <EditOrder prevOrder={order} setOpen={setOpen} open={open}/>
        </Box>
    );
};

export {OrderActions};
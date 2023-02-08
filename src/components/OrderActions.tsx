import {Box} from "@mui/material";
import {Delete} from "@mui/icons-material";
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
            <Comments comments={order.comments} id={order.id}/>
            <EditOrder prevOrder={order} setOpen={setOpen} open={open}/>
            <Delete/>
        </Box>
    );
};

export {OrderActions};
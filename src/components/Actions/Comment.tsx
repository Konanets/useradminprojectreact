import {Typography} from "@mui/material";
import {FC} from "react";

import {IComment} from "../../types";

interface ICommentProps {
    comment: IComment
}


const Comment: FC<ICommentProps> = ({comment}) => {
    return (
        <>
            <Typography color={'black'} component={'span'} variant={'body1'}>{comment.comment}</Typography>
            <Typography color={'gray'} component={'span'} fontSize={'small'} variant={'body1'}>
                {comment.created_at.split('T')[0]} / {comment.created_at.split('T')[1].slice(0, 8)}
            </Typography>

        </>

    );
};

export {Comment};
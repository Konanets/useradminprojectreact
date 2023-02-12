import {Avatar, Grid, Paper, Typography} from "@mui/material";
import {FC} from "react";
import { deepOrange, deepPurple,common } from '@mui/material/colors';

import {IComment} from "../../types";
import {customIntlFormatDistance, stringToColor, useAppSelector} from "../../utils";

interface ICommentProps {
    comment: IComment
}


const Comment: FC<ICommentProps> = ({comment}) => {

    const {user} = useAppSelector((state) => state.authReducer)

    const check = !!user && user.id === comment.manager.user

    return (
        <Grid display={"flex"} alignItems={'end'} justifyContent={check ? 'end' : 'start'}>
            <Avatar sx={{marginX: 1, marginTop: 1, bgcolor:stringToColor(comment.manager.name)}}
                    alt={comment.manager.name}>{comment.manager.name[0] + comment.manager.surname[0]}</Avatar>
            <Paper style={{padding: "10px 10px", marginTop: 10}}>
                <Grid container wrap="nowrap">
                    <Grid display={'flex'} flexDirection={'column'} justifyContent="left" item xs zeroMinWidth>
                        <Typography fontSize={'small'} m={0} textAlign={'left'} color={'blue'} component={'h6'}
                                    variant={'h6'}>{comment.manager.name} {comment.manager.surname}</Typography>
                        <Typography fontSize={'small'} textAlign={'left'} component={'span'}
                                    variant={'body1'}>{comment.comment}</Typography>
                        <Typography textAlign={'left'} color={'gray'} component={'span'} fontSize={'x-small'}
                                    variant={'body1'}>
                            {customIntlFormatDistance(comment.created_at)}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>


    );
};

export {Comment};
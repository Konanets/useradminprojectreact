import {
    Badge,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton, TextField
} from "@mui/material";
import {FC, useEffect, useRef, useState} from "react";
import {Preview} from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import {useForm} from "react-hook-form";

import {Comment} from "./Comment";
import {useAppDispatch} from "../../utils";
import {orderActions} from "../../redux/slices";
import {IComment} from "../../types";

interface ICommentsProps {
    comments: IComment[],
    id: number
}

const Comments: FC<ICommentsProps> = ({comments, id}) => {

    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
    } = useForm<{ comment: string }>()


    const handleClickOpen = () => () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef<HTMLElement>(null);

    const onSubmit = ({comment}: { comment: string }) => {
        const data = {comment, id}
        dispatch({type: orderActions.sendComment.type, data})
    }


    useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 1
        }} title="View comments details">
            <Dialog

                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogTitle id="scroll-dialog-title">Comments</DialogTitle>
                <DialogContent dividers={true} id="scroll-dialog-description"
                               ref={descriptionElementRef}
                               tabIndex={-1}>
                        {comments.map((comment) => (
                                <Comment key={`comment-${comment.id}`} comment={comment}/>
                        ))}
                </DialogContent>
                <DialogActions sx={{
                    maxHeight: '250px'
                }}>
                    <form onSubmit={handleSubmit((data) => onSubmit(data))}
                          style={{width: '100%', display: 'flex', alignItems: 'end'}}>
                        <TextField inputProps={{maxLength: 255}} fullWidth rows={6} placeholder={'write your comment'}
                                   multiline {...register('comment')}
                        />
                        <IconButton type={'submit'} size="large">
                            <SendIcon fontSize={'large'} color={'primary'}/>
                        </IconButton>

                    </form>
                </DialogActions>
            </Dialog>
            <Badge badgeContent={comments.length} color="success">
                <Preview fontSize={'medium'} onClick={handleClickOpen()} color={'primary'}/>
            </Badge>
        </Box>
    );
};

export {Comments};
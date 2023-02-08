import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {FC} from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {useForm} from "react-hook-form";

import {ICreateGroup} from "../../types";
import {useAppDispatch} from "../../utils";
import {groupActions} from "../../redux/slices";

interface IAddGroupProps {
    open: boolean,
    setOpen: (value: boolean) => void
}

const AddGroup: FC<IAddGroupProps> = ({setOpen, open}) => {

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit
    } = useForm<ICreateGroup>()


    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data: ICreateGroup) => {
        if (data.name.length > 2) {
            dispatch({type: groupActions.createNewGroup.type, data})
            handleClose()
        }
    }


    return (
        <Dialog open={open} onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
            <DialogTitle display={'flex'} justifyContent={'center'} alignItems={'center'}>
                Add new Group
                <GroupAddIcon sx={{marginLeft: 1}} color={'primary'}/>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To create new Group.
                </DialogContentText>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Group name"
                        type="name"
                        fullWidth
                        variant="standard"
                        {...register('name')}
                    />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type={'submit'} >Submit</Button>
                    </DialogActions>
                </form>

            </DialogContent>
        </Dialog>
    );
};

export {AddGroup};
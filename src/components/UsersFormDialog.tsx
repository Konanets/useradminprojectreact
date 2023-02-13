import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import {ICreateUser} from "../types";
import {useAppDispatch, useAppSelector, userFormValidators} from "../utils";
import {usersActions} from "../redux/slices";





interface IUserFormDialogProps {
    open: boolean
    setOpen: (value: boolean) => void
}

const UsersFormDialog: FC<IUserFormDialogProps> = ({open, setOpen}) => {

    const dispatch = useAppDispatch()

    const {error} = useAppSelector(state => state.usersReducer)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<ICreateUser>({resolver: joiResolver(userFormValidators), mode: 'all'})

    const handleClose = () => {
        setOpen(false);
        reset()
    };

    const onSubmit = (data: ICreateUser) => {
        dispatch({type: usersActions.createNewUser.type, data})
    }


    return (
        <>
            <Dialog open={open} onClose={handleClose} scroll={'paper'}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description">
                <DialogTitle id="scroll-dialog-title">Create new User</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit((data) => onSubmit(data))}
                          style={{display: 'flex', flexDirection: "column"}}>
                        <TextField label='Email' margin="dense" sx={{marginRight: 2}} {...register('email')}
                                   placeholder={'input email'} helperText={errors.email?.message}/>
                        <TextField label='Name' margin="dense" sx={{marginRight: 2}} {...register('profile.name')}
                                   placeholder={'input name'} helperText={errors.profile?.name?.message}/>
                        <TextField label='Surname' margin="dense" sx={{marginRight: 2}} {...register('profile.surname')}
                                   placeholder={'input surname'} helperText={errors.profile?.surname?.message}/>
                        <DialogActions>
                            <Button onClick={()=>handleClose()} variant={'outlined'}>Cancel</Button>
                            <Button type={'submit'} variant={'outlined'}>Send</Button>
                        </DialogActions>
                    </form>
                    {error.length > 0 && <Alert severity={'error'} variant={'filled'}>{error}</Alert>}
                </DialogContent>
            </Dialog>
        </>

    );
};

export {UsersFormDialog};
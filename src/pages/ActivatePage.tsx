import {Alert, Box, Button, Container, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {useParams} from "react-router-dom";

import {IPassword} from "../types";
import {passwordFormValidators, useAppDispatch, useAppSelector} from "../utils";
import {authActions} from "../redux/slices";


interface ILoadData {
    data: IPassword,
    token: string
}


const ActivatePage = () => {

    const dispatch = useAppDispatch()

    const {token} = useParams<{ token: string }>()

    const {error} = useAppSelector(state => state.authReducer)

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm<IPassword>({resolver: joiResolver(passwordFormValidators), mode: 'all'})

    const onSubmit = (data: IPassword) => {
        const formData: ILoadData = {
            data,
            token: !!token ? token : ''
        }
        dispatch({type: authActions.activateUser.type, data: formData})
    }


    return (
        <Container sx={{
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <Box display={'flex'} flexDirection={'column'} gap={1}>

                    <TextField sx={{width: 250}} {...register('password')} label={'password'}
                               helperText={errors.password?.message}/>
                    <TextField sx={{width: 250}} {...register('password_confirmation')} label={'confirm password'}
                               helperText={watch('password') !== watch('password_confirmation') && watch('password_confirmation').length > 1 ? 'password not equal!' : ''}/>
                    <Button type={'submit'} variant={'contained'}>Send</Button>
                    {error.length > 0 && <Alert severity={'error'}>{error}</Alert>}
                </Box>
            </form>

        </Container>
    );
};

export {ActivatePage};
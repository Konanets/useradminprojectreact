import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container, Fade,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import {useState, MouseEvent, FC} from "react";
import {Visibility, VisibilityOff, Done} from "@mui/icons-material";
import {useForm, SubmitHandler} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {loginFormValidators} from "../utils";
import {ILogin} from "../types";
import {useAppDispatch, useAppSelector} from "../utils";
import {authActions} from "../redux/slices";

const LoginPage: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ILogin>({resolver: joiResolver(loginFormValidators), mode: 'all'})

    const dispatch = useAppDispatch()

    const [showPassword, setShowPassword] = useState(false);

    const {isLoading, error} = useAppSelector(state => state.authReducer)

    const onSubmit: SubmitHandler<ILogin> = (data: ILogin) => {
        dispatch({type: authActions.login.type, data})
    }

    return (
        <Container>
            <Box sx={{
                height: '5vh',
                padding: 1
            }}>
                {error && (<Alert severity="error">{error}</Alert>)}
            </Box>
            <Container sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh'
            }}>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <Box sx={{
                        height: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& .MuiTextField-root': {width: '35ch'},
                    }}>
                        <Typography variant='h2' component='h1' color='blue' m={3} textAlign='center'>
                            Login
                        </Typography>
                        <TextField
                            required
                            variant="standard"
                            label='Email'
                            sx={{
                                marginY: 2
                            }}
                            {...register('email')}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            required
                            variant="standard"
                            type={showPassword ? 'text' : 'password'}
                            label='Password'
                            sx={{
                                marginY: 2
                            }}
                            {...register('password')}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((show) => !show)}
                                            onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
                                                event.preventDefault();
                                            }}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Box sx={{
                            width: '100%'
                        }}>
                            <Button type={"submit"} variant={'contained'} size={'large'}>LogIn</Button>
                        </Box>
                        {isLoading === 'success' ? (
                                <Done fontSize={'large'} color={'success'}/>
                            ) :
                            <Fade
                                in={isLoading === 'pending'}
                                style={{
                                    transitionDelay: isLoading === 'pending' ? '800ms' : '0ms',
                                }}
                                unmountOnExit
                            >
                                <CircularProgress/>
                            </Fade>
                        }
                    </Box>
                </form>

            </Container>
        </Container>

    );
};

export {LoginPage};



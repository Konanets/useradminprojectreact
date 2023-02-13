import {styled} from "@mui/material/styles";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {
    Avatar,
    Box, Container,
    CssBaseline,
    Divider,
    Drawer,
    IconButton, Link as MuiLink,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Outlet, useLocation, useNavigate} from "react-router-dom";

import {authActions} from "../redux/slices";
import {stringToColor, useAppDispatch, useAppSelector} from "../utils";

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const MainLayout = () => {

    const theme = useTheme();

    const {user} = useAppSelector((state) => state.authReducer)

    const [open, setOpen] = useState(false);

    const location = useLocation()
    const navigation = useNavigate()
    const dispatch = useAppDispatch()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    {!!user && <Avatar sx={{marginX: 1, bgcolor: stringToColor(user.profile.name)}}
                                       alt={user.profile.name}>{user.profile.name[0] + user.profile.surname[0]}</Avatar>}
                    <Typography textAlign={'center'} variant="h6" noWrap component="div">
                        {!!user && 'Welcome ' + user.profile.name}
                    </Typography>


                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <Container>
                    <Typography>
                        <MuiLink underline="none" sx={{fontSize: 22, cursor: 'pointer'}}
                                 onClick={() => location.pathname !== '/orders' && navigation('/orders')}>
                            Orders
                        </MuiLink>
                    </Typography>
                    {
                        (!!user && user.is_superuser) && <Typography>
                            <MuiLink underline="none" sx={{fontSize: 22, cursor: 'pointer'}}
                                     onClick={() => location.pathname !== '/admin' && navigation('/admin')}>
                                Admin
                            </MuiLink>
                        </Typography>
                    }
                    <Typography>
                        <MuiLink underline="none" sx={{fontSize: 22, cursor: 'pointer'}}
                                 onClick={() => dispatch(authActions.logOut())}>
                            LogOut
                        </MuiLink>
                    </Typography>
                </Container>
                <Divider/>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
                <Outlet/>
            </Main>
        </Box>
    )
};

export {MainLayout};
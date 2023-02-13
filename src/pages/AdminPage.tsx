import {Box, Button, LinearProgress, Pagination, Toolbar} from "@mui/material";
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../utils";
import {ChangeEvent, useEffect, useState} from "react";
import {usersActions} from "../redux/slices";
import {UserData, UsersFormDialog} from "../components";


const AdminPage = () => {

    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams();

    const paramPage = searchParams.get('page')

    const [page, setPage] = useState<number>((paramPage && paramPage.length) ? +paramPage : 1)
    const [open, setOpen] = useState<boolean>(false)

    const {users, isLoading, count, next, previous} = useAppSelector(state => state.usersReducer)

    const handleClickOpen = () => () => {
        setOpen(true);
    };

    useEffect(() => {
        let data = {
            page
        }
        setSearchParams((prev) => {
            return {
                ...prev,
                ...data
            }
        })
        dispatch({type: usersActions.loadUsers.type, data})
        setOpen(false)
    }, [isLoading === 'loadNew', page])

    return (
        <Box>
            <Toolbar>
                <Button onClick={handleClickOpen()}>Create</Button>
                <Pagination page={page} count={Math.ceil(count / 10)}
                            onChange={(event: ChangeEvent<unknown>, value: number) => {
                                setPage(value)
                            }
                            }/>
            </Toolbar>
            <Box>
                {
                    !!users && users.map((user) => <UserData key={`user-${user.id}`} user={user}/>)
                }
                {
                    isLoading==='pending'&&<LinearProgress />
                }
            </Box>
            {open && <UsersFormDialog open={open} setOpen={setOpen}/>}
        </Box>
    );
};

export {AdminPage};
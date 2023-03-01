import {Box, Button, Chip, LinearProgress, Pagination, Toolbar, Typography} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import DescriptionIcon from '@mui/icons-material/Description';
import PieChartIcon from '@mui/icons-material/PieChart';

import {stringToColor, useAppDispatch, useAppSelector} from "../utils";
import {ChangeEvent, useEffect, useState} from "react";
import {usersActions} from "../redux/slices";
import {UserData, UsersFormDialog} from "../components";
import {PieChart} from 'react-minimal-pie-chart';
import {orderService} from "../services";
import {IStatistics} from "../types";


const AdminPage = () => {

    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams();

    const paramPage = searchParams.get('page')

    const [page, setPage] = useState<number>((paramPage && paramPage.length) ? +paramPage : 1)
    const [open, setOpen] = useState<boolean>(false)
    const [pieData, setPieData] = useState<IStatistics | null>(null)

    const {users, isLoading, count} = useAppSelector(state => state.usersReducer)

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

        orderService.getOrdersStatistic().then(({data}) => setPieData(data))
    }, [isLoading === 'loadNew', page])


    const MyTypography = () => <Typography>Orders: {!!pieData ? pieData.total_count : 0}</Typography>

    const colors = ['#E38627', '#C13C37', "#6A2135", "#c00b3d", "#0a0b74", "#Ca0b74"]

    return (
        <Box>
            <Box display={'flex'} width={400} height={200}>
                <Chip icon={<DescriptionIcon fontSize={'large'} color={'warning'}/>}
                      label={<MyTypography/>}/>
                <Box height={200} minWidth={300}>
                    {!!pieData &&
                        <PieChart
                            data={pieData.statuses.map((item, index) => {
                                return {
                                    color: colors[index],
                                    title: item.status === null ? 'null' : item.status,
                                    value: item.count
                                }
                            })}
                        />}
                </Box>
                {!!pieData && <Box>
                    {colors.map((item, index) => index < pieData?.statuses.length && <Chip key={index}
                                                                                           icon={<PieChartIcon
                                                                                               fontSize={'large'}
                                                                                               style={{color: item}}/>}
                                                                                           label={
                                                                                               <Typography>{pieData.statuses[index].status === null ? 'null ' + pieData!.statuses[index].count : pieData!.statuses[index].status + ' ' + pieData!.statuses[index].count}</Typography>}/>)}
                </Box>}
            </Box>
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
                    isLoading === 'pending' && <LinearProgress/>
                }
            </Box>
            {open && <UsersFormDialog open={open} setOpen={setOpen}/>}
        </Box>
    );
};

export {AdminPage};
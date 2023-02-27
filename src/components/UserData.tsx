import {FC, useEffect, useState} from "react";
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import {PieChart} from "react-minimal-pie-chart";

import {IStatistics, IUser} from "../types";
import {Box, Chip, Grid, IconButton, Paper, Typography} from "@mui/material";
import {usersService} from "../services";
import {customIntlFormatDistance, useAppDispatch} from "../utils";
import {usersActions} from "../redux/slices";
import DescriptionIcon from "@mui/icons-material/Description";
import PieChartIcon from "@mui/icons-material/PieChart";

interface IUserDataProps {
    user: IUser
}

const colors = ['#E38627', '#C13C37', "#6A2135", "#c00b3d", "#0a0b74", "#Ca0b74"]

const UserData: FC<IUserDataProps> = ({user}) => {

    const dispatch = useAppDispatch()

    const [link, setLink] = useState<string | null>(null)
    const [statistic, setStatistic] = useState<IStatistics | null>(null)

    const onClick = () => {
        usersService.getUserToken(user.id).then(({data}) => setLink(data))
    }

    const onCopy = () => {
        if (!!link) {
            navigator.clipboard.writeText(`localhost:3000/activate/${link}`)
        }

    }

    const banUser = async () => {
        const {data} = await usersService.banUser(user.id)
        dispatch(usersActions.setNewUser(data))
    }

    const unBanUser = async () => {
        const {data} = await usersService.unBanUser(user.id)
        dispatch(usersActions.setNewUser(data))
    }

    const loadStatistic = async () => {
        const {data} = await usersService.getStatisticById(user.id)
        setStatistic(data)
        console.log(data)
    }


    return (
        <Paper sx={{padding: 2, marginTop: 1}} elevation={15}>
            <Grid display={'flex'} alignItems={'center'}>
                <Grid>
                    <Typography>id: {user.id}</Typography>
                    <Typography>email: {user.email}</Typography>
                    <Typography>name: {user.profile.name}</Typography>
                    <Typography>surname: {user.profile.surname}</Typography>
                    <Typography>is_active: {String(user.is_active)}</Typography>
                    <Typography>last_login: {user.last_login ? customIntlFormatDistance(user.last_login) : 'Never'}</Typography>
                </Grid>
                <Grid display={'flex'}>
                    <IconButton onClick={() => !!link ? onCopy() : onClick()}>
                        {!!link ? <ContentCopyIcon color={'primary'}/> :
                            <ReplayIcon color={'primary'} fontSize={'medium'}/>
                        }
                    </IconButton>
                    <IconButton onClick={() => banUser()}>
                        <PersonOffOutlinedIcon/>
                    </IconButton>

                    <IconButton onClick={() => unBanUser()}>
                        <PersonOutlineIcon/>
                    </IconButton>

                    <IconButton onClick={() => loadStatistic()}>
                        <BarChartOutlinedIcon/>
                    </IconButton>
                </Grid>

                {!!statistic && <Grid display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
                    <Chip icon={<DescriptionIcon fontSize={'large'} color={'warning'}/>}
                          label={<Typography>Orders:{statistic.total_count}</Typography>}/>
                    <Box width={200} height={100}>
                        <PieChart
                            data={statistic.statuses.map((item, index) => {
                                return {
                                    color: colors[index],
                                    title: item.status === null ? 'null' : item.status,
                                    value: item.count
                                }
                            })}
                        />
                    </Box>
                    <Box>
                        {colors.map((item, index) => index < statistic?.statuses.length && <Chip key={index}
                                                                                                 icon={<PieChartIcon
                                                                                                     fontSize={'large'}
                                                                                                     style={{color: item}}/>}
                                                                                                 label={
                                                                                                     <Typography>{statistic.statuses[index].status === null ? 'null ' + statistic!.statuses[index].count : statistic!.statuses[index].status + ' ' + statistic!.statuses[index].count}</Typography>}/>)}
                    </Box>
                </Grid>}

            </Grid>
        </Paper>
    );
};

export {UserData};
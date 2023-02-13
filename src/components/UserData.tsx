import {FC, useState} from "react";
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import {IUser} from "../types";
import {Grid, IconButton, Paper, Typography} from "@mui/material";
import {usersService} from "../services";
import {customIntlFormatDistance} from "../utils";

interface IUserDataProps {
    user: IUser
}

const UserData: FC<IUserDataProps> = ({user}) => {


    const [link, setLink] = useState<string | null>(null)

    const onClick = () => {
        usersService.getUserToken(user.id).then(({data}) => setLink(data))
    }

    const onCopy = () => {
        if (!!link) {
            navigator.clipboard.writeText(`localhost:3000/activate/${link}`)
        }

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
                <Grid>
                    <IconButton onClick={() => !!link ? onCopy() : onClick()}>
                        {!!link ? <ContentCopyIcon color={'primary'}/> :
                            <ReplayIcon color={'primary'} fontSize={'medium'}/>
                        }
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

export {UserData};
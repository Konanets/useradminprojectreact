import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton, InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {FC, useEffect, memo, useRef, useState} from "react";
import ReorderIcon from '@mui/icons-material/Reorder';
import {useForm} from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";

import {IEditOrder, IOrder, numberFieldsEnum} from "../../types";
import {useAppDispatch, useAppSelector} from "../../utils";
import {groupActions, orderActions} from "../../redux/slices";
import {AddGroup} from "./AddGroup";


interface IEditOrderProps {
    prevOrder: IOrder,
    open: boolean,
    setOpen: (value: boolean) => void
}


const EditOrder: FC<IEditOrderProps> = memo(({prevOrder, open, setOpen}) => {

    const dispatch = useAppDispatch()

    const [openCreateGroup, setOpenCreateGroup] = useState<boolean>(false)

    const [groupPage, setGroupPage] = useState<number>(1)

    const {user} = useAppSelector(state => state.authReducer)

    const {groups, loading, next} = useAppSelector(state => state.groupReducer)

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm<IEditOrder>()

    const handleClickOpen = () => () => {
        setGroupPage(() => 1)
        let data = {
            page: groupPage
        }
        dispatch({type: groupActions.loadGroups.type, data})
        setOpen(true);
    };

    const openAddGroup = () => () => {
        setOpenCreateGroup(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const loadMoreGroups = () => {
        if (next && next.length > 0) {
            setGroupPage((prevState) => 1 + prevState)
            let data = {
                page: groupPage + 1
            }
            dispatch({type: groupActions.loadGroups.type, data})
        }
    }

    const descriptionElementRef = useRef<HTMLElement>(null);

    const onSubmit = (formData: IEditOrder) => {
        let formatedData: IEditOrder = {}
        for (const [key, value] of Object.entries(formData)) {

            if (value.toString().length >= 1 || (key in numberFieldsEnum && Number(value) > 0)) {
                formatedData = {
                    [key]: value,
                    ...formatedData
                }
            }
        }
        let data = {data: formatedData, id: prevOrder.id}
        dispatch({type: orderActions.edit.type, data})
    }

    useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    useEffect(() => {
        if (prevOrder.name?.length) {
            setValue('name', prevOrder.name)
        }
        if (prevOrder.surname?.length) {
            setValue('surname', prevOrder.surname)
        }
        if (prevOrder.email?.length) {
            setValue('email', prevOrder.email)
        }
        if (prevOrder.phone?.length) {
            setValue('phone', prevOrder.phone)
        }
        if (prevOrder.age) {
            setValue('age', prevOrder.age)
        }
        if (prevOrder.sum) {
            setValue('sum', prevOrder.sum)
        }
        if (prevOrder.alreadyPaid) {
            setValue('alreadyPaid', prevOrder.alreadyPaid)
        }
        if (prevOrder.course?.length) {
            setValue('course', prevOrder.course)
        }
        if (prevOrder.course_type?.length) {
            setValue('course_type', prevOrder.course_type)
        }
        if (prevOrder.course_format?.length) {
            setValue('course_format', prevOrder.course_format)
        }
        if (prevOrder.group?.id) {
            setValue('group', '' + prevOrder.group.id)
        }
    }, [])

    let manager_id = !!prevOrder.manager ? prevOrder.manager.user : 0
    const notYour = !!user && user!.id === manager_id || !!user && user!.id !== manager_id && manager_id === 0

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 1
        }} title="Edit order data">
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
                <DialogTitle display={'flex'} justifyContent={'left'} alignItems={'center'}
                             id="scroll-dialog-title">Edit <ReorderIcon fontSize={'large'}
                                                                        color={'primary'}/></DialogTitle>
                <DialogContent dividers={true}>
                    <Box>
                        <form style={{
                            display: 'flex', flexWrap: 'wrap'
                        }} onSubmit={handleSubmit((data) => {
                            onSubmit(data)

                        })}>
                            <TextField sx={{width: 220, marginRight: 2}}
                                       label='Name' margin={'normal'} focused={true}
                                       placeholder={'Input name'} {...register('name')}/>
                            <TextField sx={{width: 220, marginRight: 2}}
                                       label='Surname' margin={'normal'} focused={true}
                                       placeholder={'Input surname'} {...register('surname')}
                                       helperText={errors.surname?.message}/>
                            <TextField sx={{width: 220, marginRight: 2}}
                                       label='Email' margin={'normal'} focused={true}
                                       placeholder={'Input email'} {...register('email')}
                                       helperText={errors.email?.message}/>
                            <TextField sx={{width: 220, marginRight: 2}}
                                       label='Phone' margin={'normal'} focused={true}
                                       placeholder={'Input phone'} {...register('phone')}
                                       helperText={errors.phone?.message}/>
                            <TextField sx={{width: 220, marginRight: 2}}
                                       label='Age' margin={'normal'}
                                       focused={true}
                                       placeholder={'Input age'} {...register('age')}
                                       helperText={errors.age?.message}/>
                            <TextField sx={{width: 220, marginRight: 2}} label='Already Paid' margin={'normal'}
                                       focused={true}
                                       placeholder={'Input alreadyPaid'} {...register('alreadyPaid')}
                                       helperText={errors.alreadyPaid?.message}/>
                            <TextField sx={{width: 220, marginRight: 2}}
                                       label='Sum' margin={'normal'}
                                       focused={true}
                                       placeholder={'Input sum'} {...register('sum')}
                                       helperText={errors.sum?.message}/>

                            <FormControl focused sx={{width: 220, marginRight: 2, maxHeight: '56px', marginTop: 2}}>
                                <InputLabel>Course type</InputLabel>
                                <Select
                                    variant={'outlined'}
                                    label="Course type"
                                    defaultValue={prevOrder.course_type?.length ? prevOrder.course_type : ''}
                                    {...register('course_type')}
                                >
                                    <MenuItem value={''}>None</MenuItem>
                                    <MenuItem value={'pro'}>pro</MenuItem>
                                    <MenuItem value={'minimal'}>minimal</MenuItem>
                                    <MenuItem value={'premium'}>premium</MenuItem>
                                    <MenuItem value={'incubator'}>incubator</MenuItem>
                                    <MenuItem value={'vip'}>vip</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl focused sx={{width: 220, marginRight: 2, marginTop: 2}}>
                                <InputLabel>Course</InputLabel>
                                <Select
                                    variant={'outlined'}
                                    label="Course"
                                    defaultValue={prevOrder.course?.length ? prevOrder.course : ''}
                                    {...register('course')}
                                >
                                    <MenuItem value={''}>None</MenuItem>
                                    <MenuItem value={'FS'}>FS</MenuItem>
                                    <MenuItem value={'QACX'}>QACX</MenuItem>
                                    <MenuItem value={'JCX'}>JCX</MenuItem>
                                    <MenuItem value={'JSCX'}>JSCX</MenuItem>
                                    <MenuItem value={'FE'}>FE</MenuItem>
                                    <MenuItem value={'PCX'}>PCX</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl focused sx={{width: 220, marginRight: 2, marginTop: 2}}>
                                <InputLabel>Course Format</InputLabel>
                                <Select
                                    variant={'outlined'}
                                    label="Course Format"
                                    defaultValue={prevOrder.course_format?.length ? prevOrder.course_format : ''}
                                    {...register('course_format')}>
                                    <MenuItem value={''}>None</MenuItem>
                                    <MenuItem value={'online'}>online</MenuItem>
                                    <MenuItem value={'static'}>static</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl focused sx={{width: 220, marginRight: 2, marginTop: 2}}>
                                <InputLabel>Group</InputLabel>
                                {groups.length > 0 && <Select
                                    variant={'outlined'}
                                    label="Group"
                                    defaultValue={prevOrder.group && prevOrder.group.id ? prevOrder.group.id + '' : ''}
                                    {...register('group')}>
                                    <MenuItem value={''}>None</MenuItem>
                                    {loading === 'success' && groups.map((group) => {
                                            if (!!prevOrder.group && group.id !== prevOrder.group.id || !prevOrder.group) {
                                                return (<MenuItem key={group.id} value={'' + group.id}>
                                                    {group.name}
                                                </MenuItem>)
                                            }
                                        }
                                    )
                                    }
                                    {!!prevOrder.group &&
                                        <MenuItem key={prevOrder.group.id} value={'' + prevOrder.group.id}>
                                            {prevOrder.group.name}
                                        </MenuItem>}

                                    <Button disabled={!next} onClick={() => loadMoreGroups()}>Load more</Button>
                                </Select>}
                            </FormControl>

                            <FormControl focused sx={{width: 220, marginRight: 2, marginTop: 2}}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    variant={'outlined'}
                                    label="Status"
                                    defaultValue={prevOrder.status?.length ? prevOrder.status : 'В работе'}
                                    {...register('status')}
                                >
                                    <MenuItem value={''}>None</MenuItem>
                                    <MenuItem value={'В работе'}>В работе</MenuItem>
                                    <MenuItem value={'Новый'}>Новый</MenuItem>
                                    <MenuItem value={'Согласен'}>Согласен</MenuItem>
                                    <MenuItem value={'Не согласен'}>Не согласен</MenuItem>
                                    <MenuItem value={'Дубляж'}>Дубляж</MenuItem>
                                </Select>
                            </FormControl>

                            <DialogActions sx={{maxHeight: '250px', width: '100%'}}>
                                <Button onClick={openAddGroup()}>Create new Group</Button>
                                <IconButton type={'submit'} size="large">
                                    <SendIcon fontSize={'large'} color={'primary'}/>
                                </IconButton>
                            </DialogActions>

                        </form>
                    </Box>
                </DialogContent>
                {openCreateGroup && <AddGroup open={openCreateGroup} setOpen={setOpenCreateGroup}/>}
            </Dialog>

            <Edit fontSize={'medium'} onClick={notYour ? handleClickOpen() : (() => {
            })} color={notYour ? 'success' : 'disabled'}/>
        </Box>
    );
})

export
{
    EditOrder
}
    ;
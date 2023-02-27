import {
    Button, Checkbox,
    FormControl, IconButton,
    InputLabel, LinearProgress,
    MenuItem,
    Select,
    TextField,
    Toolbar
} from "@mui/material";
import {useForm} from "react-hook-form";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FC, useEffect, useState} from "react";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import {IOrderParams, orderParamsEnum} from "../types";
import {axiosInstance} from "../services";
import {urls} from "../configs";
import {Skeleton} from "@mui/lab";

interface IOrderFilterProps {
    query: IOrderParams,
    setPage: (value: number) => void
}

const OrdersFilter: FC<IOrderFilterProps> = ({query, setPage}) => {


    const [searchParams, setSearchParams] = useSearchParams();
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(''));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(''));
    const [resset, setResset] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        reset
    } = useForm<IOrderParams>()

    const navigator = useNavigate()

    const onHandleChange = (data: IOrderParams) => {
        const checkStartDate = !(isNaN(Number(startDate?.date())) &&
            isNaN(Number(startDate?.month())) &&
            isNaN(Number(startDate?.year())))
        const checkEndDate = !(isNaN(Number(endDate?.date())) &&
            isNaN(Number(endDate?.month())) &&
            isNaN(Number(endDate?.year())))

        const startDateValue = `${startDate?.year()}-${Number(startDate?.month()) + 1}-${startDate?.date()}`
        const endDateValue = `${endDate?.year()}-${Number(endDate?.month()) + 1}-${endDate?.date()}`

        const order = query.order
        const checkOrder = order ? {order} : {}

        setPage(1)

        query = {...checkOrder, page: 1}
        query = checkStartDate ? {start_date: startDateValue, ...query} : query
        query = checkEndDate ? {end_date: endDateValue, ...query} : query
        for (const [key, value] of Object.entries(data)) {

            if (value.toString().length >= 1 && !!value) {
                query = {
                    [key]: value,
                    ...query
                }
            }

        }

        setSearchParams(prev => {
            return {...prev, ...query}
        })
    }

    useEffect(() => {
        let name = searchParams.get('name')
        if (name && name.length > 1) {
            setValue('name', name)
        }
        let surname = searchParams.get('surname')
        if (surname && surname.length > 1) {
            setValue('surname', surname)
        }
        let email = searchParams.get('email')
        if (email && email.length > 1) {
            setValue('email', email)
        }
        let phone = searchParams.get('phone')
        if (phone && phone.length > 1) {
            setValue('phone', phone)
        }
        let age = searchParams.get('age')
        if (age && age.length > 1) {
            setValue('age', +age)
        }
        let course = searchParams.get('course')
        if (course && course.length > 1) {
            setValue('course', course)
        }
        let course_type = searchParams.get('course_type')
        if (course_type && course_type.length > 1) {
            setValue('course_type', course_type)
        }
        let course_format = searchParams.get('course_format')
        if (course_format && course_format.length > 1) {
            setValue('course_format', course_format)
        }
        let group = searchParams.get('group')
        if (group && group.length > 1) {
            setValue('group', group)
        }

        const paramsStartDate = searchParams.get('start_date')

        if (paramsStartDate && paramsStartDate.split('-').length === 3) {
            let splited = paramsStartDate.split('-')

            setStartDate(() => {
                return dayjs(`${splited[0]}-${splited[1]}-${splited[2]}`)
            })
        }

        const paramsEndDate = searchParams.get('end_date')

        if (paramsEndDate && paramsEndDate.split('-').length === 3) {
            let splited = paramsEndDate.split('-')

            setEndDate(() => {
                return dayjs(`${splited[0]}-${splited[1]}-${splited[2]}`)
            })
        }
    }, [])

    useEffect(() => {
        setResset(false)
    }, [resset])

    if (resset) return null

    return (
        <form onSubmit={handleSubmit(onHandleChange)}>
            <Toolbar>
                <TextField defaultValue={searchParams.get('name') ? searchParams.get('name') : ''} variant={'outlined'}
                           label={'First name'} size={'small'}
                           sx={{width: 120}} {...register('name')}/>
                <TextField defaultValue={searchParams.get('surname') ? searchParams.get('surname') : ''}
                           variant={'outlined'} label={'Last name'} size={'small'}
                           sx={{width: 120}} {...register('surname')}/>
                <TextField defaultValue={searchParams.get('email') ? searchParams.get('email') : ''}
                           variant={'outlined'} label={'Email'} size={'small'}
                           sx={{width: 120}} {...register('email')}/>
                <TextField defaultValue={searchParams.get('phone') ? searchParams.get('phone') : ''}
                           variant={'outlined'} label={'Phone'} size={'small'}
                           sx={{width: 120}} {...register('phone')}/>
                <TextField defaultValue={searchParams.get('age') ? searchParams.get('age') : ''} variant={'outlined'}
                           label={'Age'} size={'small'}
                           sx={{width: 120}} {...register('age')}/>
                <FormControl sx={{width: 120}}>
                    <InputLabel>Course</InputLabel>
                    <Select
                        variant={'outlined'}
                        size={'small'}
                        label="Course"
                        defaultValue={searchParams.get('course') ? searchParams.get('course') : ''}
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

                <FormControl sx={{width: 120}}>
                    <InputLabel>Course Format</InputLabel>
                    <Select
                        variant={'outlined'}
                        size={'small'}
                        label="Course Format"
                        defaultValue={searchParams.get('course_format') ? searchParams.get('course_format') : ''}
                        {...register('course_format')}
                    >
                        <MenuItem value={''}>None</MenuItem>
                        <MenuItem value={'online'}>online</MenuItem>
                        <MenuItem value={'static'}>static</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{width: 120}}>
                    <InputLabel>Course type</InputLabel>
                    <Select
                        variant={'outlined'}
                        size={'small'}
                        label="Course type"
                        defaultValue={searchParams.get('course_type') ? searchParams.get('course_type') : ''}
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

                <TextField defaultValue={searchParams.get('group') ? searchParams.get('group') : ''}
                           variant={'outlined'} label={'Group'} size={'small'}
                           sx={{width: 120}} {...register('group')}/>

                <LocalizationProvider sx={{
                    height: '5px'
                }} dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => {
                            if (newValue) {
                                setStartDate(newValue)
                            }
                        }}
                        renderInput={(params) => <TextField sx={{width: '160px'}}
                                                            size={'small'} {...params} />}
                    />
                    <DesktopDatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => {
                            if (newValue) {
                                setEndDate(newValue)
                            }
                        }}
                        renderInput={(params) => <TextField sx={{width: '160px'}}
                                                            size={'small'} {...params} />}
                    />
                </LocalizationProvider>
                <Checkbox defaultChecked={!!searchParams.get('my')} {...register('my')} />My
                <Button type={'submit'} size={'small'}>Find</Button>
                <Button size={'small'} onClick={() => {
                    query = {}
                    setSearchParams(prev => {
                        return {}
                    })
                    reset()
                    setResset(true)
                }}>Reset</Button>

                <IconButton type={'submit'} onClick={() => {
                    let params: IOrderParams = {}

                    searchParams.forEach((item, key) => {
                        if (key in orderParamsEnum && item.length >= 1 || (key in orderParamsEnum && item[0] === '-' && item.slice(1) in orderParamsEnum)) {
                            params = {
                                [key]: item,
                                ...params
                            }
                        }
                    })

                    axiosInstance.get(urls.orders.excel, {
                        responseType: 'arraybuffer',
                        params
                    },).then((response) => {
                        const outputFilename = `${Date.now()}.xls`;
                        const url = window.URL.createObjectURL(new Blob([response.data]))
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', outputFilename);
                        document.body.appendChild(link);
                        link.click();
                    })
                }}>
                    <SaveAltIcon color={'primary'}/>
                </IconButton>

            </Toolbar>
        </form>


    );
};

export {OrdersFilter};
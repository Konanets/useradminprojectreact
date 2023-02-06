import {Box, IconButton, Pagination} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {useSearchParams} from "react-router-dom";
import {ChangeEvent, FC, useEffect, useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {useAppDispatch, useAppSelector} from "../utils";
import {orderActions} from "../redux/slices";
import {orderParamsEnum, IOrderParams, IGroup, IManager} from "../types";


const OrdersList: FC<{ query: IOrderParams, setPage: (value: number) => void, page: number }> = ({
                                                                                                     query,
                                                                                                     setPage,
                                                                                                     page
                                                                                                 }) => {

        const dispatch = useAppDispatch()

        const {orders, loading} = useAppSelector((state) => state.orderReducer)

        const [searchParams, setSearchParams] = useSearchParams();

        const order = searchParams.get('order')

        const [clickedIndex, setClickedIndex] = useState<number|undefined>(-1);

        const orderColumns: GridColDef[] = [
            {
                field: 'id',
                headerName: 'ID',
                width: 60,
                disableColumnMenu: true,
                type: 'number',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'name',
                headerName: 'First name',
                width: 120,
                valueFormatter: ({value}) => value === '' ? 'null' : value,
                disableColumnMenu: true,
                type: 'string',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'surname',
                headerName: 'Last name',
                width: 120,
                valueFormatter: ({value}) => value === '' ? 'null' : value,
                disableColumnMenu: true,
                type: 'string',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },

            },
            {
                field: 'email',
                headerName: 'Email',
                width: 120,
                valueFormatter: ({value}) => value === '' ? 'null' : value,
                disableColumnMenu: true,
                type: 'string',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'phone',
                headerName: 'Phone',
                width: 120,
                valueFormatter: ({value}) => value === '' ? 'null' : value,
                disableColumnMenu: true,
                type: 'string',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'age',
                headerName: 'Age',
                width: 120,
                valueFormatter: ({value}) => value === null ? 'null' : value,
                disableColumnMenu: true,
                type: 'number',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'course',
                headerName: 'Course',
                width: 120,
                valueFormatter: ({value}) => value === '' ? 'null' : value,
                disableColumnMenu: true,
                type: 'singleSelect',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'course_format',
                headerName: 'Course format',
                width: 120,
                valueFormatter: ({value}) => value === '' ? 'null' : value,
                disableColumnMenu: true,
                type: 'singleSelect',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'course_type',
                headerName: 'Course type',
                width: 120,
                valueFormatter: ({value}) => value === '' ? 'null' : value,
                disableColumnMenu: true,
                type: 'singleSelect',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 120,
                valueFormatter: ({value}) => value === null ? 'null' : value,
                disableColumnMenu: true,
                type: 'singleSelect',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'sum',
                headerName: 'Sum',
                width: 120,
                valueFormatter: ({value}) => value === null ? 'null' : value,
                disableColumnMenu: true,
                type: 'number',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'alreadyPaid',
                headerName: 'Already paid',
                width: 120,
                valueFormatter: ({value}) => value === null ? 'null' : value,
                disableColumnMenu: true,
                type: 'number',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'group',
                headerName: 'Group',
                width: 120,
                valueFormatter: ({value}: { value: IGroup }) => value !== null ? value.name : 'null',
                disableColumnMenu: true,
                type: 'string',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'created_at',
                headerName: 'Created at',
                width: 170,
                type: "date",
                valueFormatter: ({value}) => value === null ? 'null' : value.split('T')[0],
                disableColumnMenu: true,
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
            {
                field: 'manager',
                headerName: 'Manager',
                width: 120,
                valueFormatter: ({value}: { value: IManager }) => value !== null ? value.name : 'null',
                disableColumnMenu: true,
                type: 'string',
                renderCell: (cellValues: GridRenderCellParams<number>) => {
                    return (<IconButton onClick={() => {
                        clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value)
                    }}>{cellValues.value === clickedIndex ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>)
                },
            },
        ];

        const checkSearchParams = () => {
            query = {}
            searchParams.forEach((item, key) => {
                if (key in orderParamsEnum && item.length >= 1 || (key in orderParamsEnum && item[0] === '-' && item.slice(1) in orderParamsEnum)) {
                    query = {
                        [key]: item,
                        ...query
                    }
                }
            })
        }
        checkSearchParams()

        if (order) {
            query = {
                ...query,
                order: order
            }
        }
        query = {
            ...query,
            page: page
        }

        useEffect(() => {

            checkSearchParams()

            dispatch({type: orderActions.loadOrders.type, query})

        }, [dispatch, searchParams])

        const rows = loading === 'success' ? orders!.results : []

        return (
            <Box sx={{height: '80vh', width: '100%'}}>
                {orders &&
                    <DataGrid
                        disableSelectionOnClick
                        rows={rows}
                        rowCount={loading === 'success' ? orders!.count : 0}
                        columns={orderColumns}
                        pageSize={25}
                        loading={loading === 'pending'}
                        components={{
                            Pagination: () => <Pagination color="primary"
                                                          defaultValue={page > Math.ceil(orders.count / 25) ? 1 : page}
                                                          count={Math.ceil(orders.count / 25)}
                                                          page={page > Math.ceil(orders.count / 25) ? 1 : page}
                                                          onChange={(event: ChangeEvent<unknown>, value: number) => {
                                                              setPage(value);
                                                              query = {
                                                                  ...query,
                                                                  page: value
                                                              }

                                                              setSearchParams((prev) => {
                                                                  return {...prev, ...query}
                                                              })
                                                          }
                                                          }
                            />
                        }}
                        initialState={{
                            sorting: {
                                sortModel: [
                                    order ? {field: order, sort: order[0] === '-' ? 'desc' : 'asc'} :
                                        {field: 'id', sort: 'desc'}
                                ],
                            },
                        }}
                        rowsPerPageOptions={[25]}
                        sortingOrder={['asc', 'desc']}
                        onSortModelChange={(model) => {
                            if (model.length) {
                                const sort = model[0].sort === 'desc' ? '-' : ''


                                query = {
                                    ...query,
                                    order: sort + model[0].field,
                                    page: 1
                                }
                                setPage(1)

                                setSearchParams((prev) => {

                                    return {...prev, ...query}
                                })
                            }
                        }}
                    />

                }

            </Box>
        );
    }
;

export {OrdersList};
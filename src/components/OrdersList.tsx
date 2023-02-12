import {Box, Pagination} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useSearchParams} from "react-router-dom";
import {ChangeEvent, FC, useEffect, useState} from "react";

import {orderColumns, useAppDispatch, useAppSelector} from "../utils";
import {orderActions} from "../redux/slices";
import {orderParamsEnum, IOrderParams } from "../types";


const OrdersList: FC<{ query: IOrderParams, setPage: (value: number) => void, page: number }> = ({
                                                                                                     query,
                                                                                                     setPage,
                                                                                                     page
                                                                                                 }) => {

        const dispatch = useAppDispatch()

        const {orders, loading, changed} = useAppSelector((state) => state.orderReducer)

        const [searchParams, setSearchParams] = useSearchParams();



        const order = searchParams.get('order')

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

        }, [dispatch, searchParams, changed === true])


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
                        getDetailPanelContent={() => (<div>qwrqwr</div>)}
                    />

                }

            </Box>
        );
    }
;

export {OrdersList};
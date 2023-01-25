import {GridColDef} from "@mui/x-data-grid";
import {IGroup, IManager} from "../types";

const orderColumns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 60,
        disableColumnMenu: true,
        type: 'number'
    },
    {
        field: 'name',
        headerName: 'First name',
        width: 120,
        valueFormatter: ({value}) => value === '' ? 'null' : value,
        disableColumnMenu: true,
        type: 'string'
    },
    {
        field: 'surname',
        headerName: 'Last name',
        width: 120,
        valueFormatter: ({value}) => value === '' ? 'null' : value,
        disableColumnMenu: true,
        type: 'string'

    },
    {
        field: 'email',
        headerName: 'Email',
        width: 120,
        valueFormatter: ({value}) => value === '' ? 'null' : value,
        disableColumnMenu: true,
        type: 'string'
    },
    {
        field: 'phone',
        headerName: 'Phone',
        width: 120,
        valueFormatter: ({value}) => value === '' ? 'null' : value,
        disableColumnMenu: true,
        type: 'string'
    },
    {
        field: 'age',
        headerName: 'Age',
        width: 120,
        valueFormatter: ({value}) => value === null ? 'null' : value,
        disableColumnMenu: true,
        type: 'number'
    },
    {
        field: 'course',
        headerName: 'Course',
        width: 120,
        valueFormatter: ({value}) => value === '' ? 'null' : value,
        disableColumnMenu: true,
        type: 'singleSelect'
    },
    {
        field: 'course_format',
        headerName: 'Course format',
        width: 120,
        valueFormatter: ({value}) => value === '' ? 'null' : value,
        disableColumnMenu: true,
        type: 'singleSelect'
    },
    {
        field: 'course_type',
        headerName: 'Course type',
        width: 120,
        valueFormatter: ({value}) => value === '' ? 'null' : value,
        disableColumnMenu: true,
        type: 'singleSelect'
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 120,
        valueFormatter: ({value}) => value === null ? 'null' : value,
        disableColumnMenu: true,
        type: 'singleSelect'
    },
    {
        field: 'sum',
        headerName: 'Sum',
        width: 120,
        valueFormatter: ({value}) => value === null ? 'null' : value,
        disableColumnMenu: true,
        type: 'number'
    },
    {
        field: 'alreadyPaid',
        headerName: 'Already paid',
        width: 120,
        valueFormatter: ({value}) => value === null ? 'null' : value,
        disableColumnMenu: true,
        type: 'number'
    },
    {
        field: 'group',
        headerName: 'Group',
        width: 120,
        valueFormatter: ({value}: { value: IGroup }) => value !== null ? value.name : 'null',
        disableColumnMenu: true,
        type: 'string'
    },
    {
        field: 'created_at',
        headerName: 'Created at',
        width: 170,
        type: "date",
        valueFormatter: ({value}) => value === null ? 'null' : value.split('T')[0],
        disableColumnMenu: true,
    },
    {
        field: 'manager',
        headerName: 'Manager',
        width: 120,
        valueFormatter: ({value}: { value: IManager }) => value !== null ? value.name : 'null',
        disableColumnMenu: true,
        type: 'string'
    },
];

export {orderColumns}
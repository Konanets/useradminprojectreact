const baseURL = 'http://127.0.0.1:8000/api/v1'

const urls = {
    auth: {
        login: '/auth',
        refresh: '/auth/refresh',
        activate: '/auth/activate'
    },
    users: {
        my: '/users/my'
    },
    orders: {
        orders: '/orders',
        comments: '/comments',
        excel: '/orders/excel'
    },
    groups: {
        groups: '/groups'
    },
    admin: {
        users: '/admin/users',
        token: '/re_token'
    }
}

export {baseURL, urls}
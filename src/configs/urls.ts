const baseURL = 'http://127.0.0.1:8000/api/v1'

const urls = {
    auth: {
        login: '/auth',
        refresh: '/auth/refresh'
    },
    users: {
        my: '/users/my'
    },
    orders: {
        orders: '/orders',
        comments: '/comments'
    },
    groups: {
        groups: '/groups'
    }
}

export {baseURL, urls}
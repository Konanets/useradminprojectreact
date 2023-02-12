export interface IAuthInitialStore {
    user: IUser | null,
    userLoading: boolean
    authorized: boolean,
    error: string,
    isLoading: 'pending' | 'failure' | 'success' | 'none'
}

export interface ILoginTokens {
    access: string,
    refresh: string
}

export interface ILogin {
    email: string,
    password: string
}

export interface IProfile {
    name: string,
    surname: string
}

export interface IUser {
    id: number,
    email: string,
    is_active: boolean,
    is_superuser: boolean,
    create_at: string,
    update_at: string,
    last_login: string,
    profile: IProfile
}
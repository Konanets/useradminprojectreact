export interface IGetOrderResponse {
    count: number,
    previous: string | number,
    next: string | number,
    results: IOrder[] | []
}

export interface IOrderInitialState {
    orders: IGetOrderResponse | null
    loading: 'pending' | 'failure' | 'success' | 'none'
}

export interface IOrderParams {
    page?: number,
    order?: string,
    name?: string,
    surname?: string,
    email?: string,
    phone?: string,
    age?: number,
    course?: string,
    course_format?: string,
    course_type?: string,
    msg?: string,
    status?: string,
    created_at?: string,
    utm?: string,
    group?: string,
    start_date?: string,
    end_date?: string
    my?:boolean
}


export interface IOrder {
    id: number,
    name: string | null,
    surname: string | null,
    email: string | null,
    phone: string | null,
    age: number | null,
    course: string | null,
    course_format: string | null,
    course_type: string | null,
    alreadyPaid: number | null,
    sum: number | null,
    msg: string | null,
    status: boolean | null,
    manager: IManager | null,
    created_at: string | null,
    utm: string | null,
    comments: IComment[],
    group: IGroup | null
}

export interface serializedOrder {
    id: number,
    name: string | null,
    surname: string | null,
    email: string | null,
    phone: string | null,
    age: number | null,
    course: string | null,
    course_format: string | null,
    course_type: string | null,
    alreadyPaid: number | null,
    sum: number | null,
    msg: string | null,
    status: boolean | null,
    manager: string | null,
    created_at: string | null,
    utm: string | null,
    comments: IComment[],
    group: string | null

}

export interface IComment {
    id: number,
    comment: string,
    created_at: string
}


export interface IManager {
    id: number,
    name: string,
    surname: string,
    user: number
}

export interface IGroup {
    id: number,
    name: string
}
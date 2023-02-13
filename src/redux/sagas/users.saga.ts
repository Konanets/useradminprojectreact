import * as Effects from "redux-saga/effects";
import {AxiosError, isAxiosError} from "axios";

import {usersActions} from "../slices";
import {ICreateUser, IGetUsersResponse} from "../../types";
import {AxiosRes, usersService} from "../../services";

const takeLatest: any = Effects.takeLatest;

function* loadUsersByPage({data: {page}}: { data: { page: number } }) {
    try {
        const {data}: { data: IGetUsersResponse } = yield Effects.call((): AxiosRes<IGetUsersResponse> => usersService.getUsersList(page));
        yield Effects.put(usersActions.loadUsersSuccess(data));
    } catch (error) {
        if (isAxiosError(error)) {
            const serverError = error as AxiosError<{ detail: string }>;
            if (serverError && serverError.response) {
                yield Effects.put(usersActions.loadUsersFailure(serverError.message))
            }
        }
    }
}

function* loadUsers() {
    yield takeLatest(usersActions.loadUsers.type, loadUsersByPage)
}

function* createNewUserByAction({data}: { data: ICreateUser }) {
    try {
        yield Effects.call(() => usersService.createNewUser(data));
        yield Effects.put(usersActions.createNewUserSuccess());
    } catch (error) {
        if (isAxiosError(error)) {
            const serverError = error as AxiosError<{ email: string[]}>;
            if (serverError && serverError.response) {
                yield Effects.put(usersActions.createNewUserFailure(serverError.response.data.email[0]))
            }
        }
    }
}

function* createNewUser() {
    yield takeLatest(usersActions.createNewUser.type, createNewUserByAction)
}


export {loadUsers, createNewUser}
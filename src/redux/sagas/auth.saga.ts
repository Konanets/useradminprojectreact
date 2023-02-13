import * as Effects from 'redux-saga/effects'
import {AxiosError, isAxiosError} from "axios";

import {ILogin, ILoginTokens, IPassword, IUser} from "../../types";
import {authService, AxiosRes, history} from "../../services";
import {authActions} from "../slices";

const takeEvery: any = Effects.takeEvery;

interface ILoadData {
    data: IPassword,
    token: string
}

function* loginOnAction({data: user}: { data: ILogin }) {
    if (typeof user === 'undefined') return
    try {
        const {data}: { data: ILoginTokens } = yield Effects.call((): AxiosRes<ILoginTokens> => authService.login(user));
        authService.saveTokens(data)
        yield Effects.put(authActions.loginSuccess());

        history.replace('/orders')
    } catch (error) {
        if (isAxiosError(error)) {
            const serverError = error as AxiosError<{ detail: string }>;
            if (serverError && serverError.response) {
                yield Effects.put(authActions.loginFailure(serverError.response.data.detail))
            }
        }
    }

    try {
        const {data}: { data: IUser } = yield Effects.call((): AxiosRes<IUser> => authService.userData())
        yield Effects.put(authActions.saveUser(data));
    } catch (error) {
        if (isAxiosError(error)) {
            const serverError = error as AxiosError<{ detail: string }>;
            if (serverError && serverError.response) {
                authService.removeTokens()
                yield Effects.put(authActions.saveUserError())
            }
        }
        history.replace('/login')
    }
}

function* loadUser() {
    if (!authService.getAccessToken() && !authService.getRefreshToken()) {
        history.replace('/login')
        return
    }
    try {
        const {data}: { data: IUser } = yield Effects.call((): AxiosRes<IUser> => authService.userData())
        yield Effects.put(authActions.saveUser(data));
    } catch (error) {
        if (isAxiosError(error)) {
            const serverError = error as AxiosError<{ detail: string }>;
            if (serverError && serverError.response) {
                authService.removeTokens()
                yield Effects.put(authActions.saveUserError())
            }
        }
        history.replace('/login')
    }

}


function* loadBasicData() {
    yield Effects.all([
        Effects.fork(loadUser),
    ]);
}

function* loginSaga() {
    yield takeEvery(authActions.login.type, loginOnAction)
}


function* ActivateUserOnAction({data: formData}: { data: ILoadData }) {
    try {
        console.log(formData)
        yield Effects.call(() => authService.activateUser(formData.data, formData.token));
        yield Effects.put(authActions.logOut());
        history.replace('/login')
    } catch (error) {
        if (isAxiosError(error)) {
            const serverError = error as AxiosError<{ details: string }>;
            if (serverError && serverError.response) {
                console.log(serverError.response)
                yield Effects.put(authActions.activateUserFailure(serverError.response.data.details))
            }
        }
    }
}

function* activateUser() {
    yield takeEvery(authActions.activateUser.type, ActivateUserOnAction)
}


export {loginSaga, loadBasicData, activateUser}
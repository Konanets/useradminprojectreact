import {all} from 'redux-saga/effects'

import {loadBasicData, loadOrder, loginSaga} from '.';

function* rootSaga() {
    yield all([
        loginSaga(),
        loadBasicData(),
        loadOrder(),
    ])
}

export {rootSaga}
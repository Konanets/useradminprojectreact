import {all} from 'redux-saga/effects'

import {loadBasicData, loadOrder, loginSaga, commentSaga, editOrderSaga, createNewGroup} from '.';
import {loadGroup} from "./group.saga";

function* rootSaga() {
    yield all([
        loginSaga(),
        loadBasicData(),
        loadOrder(),
        commentSaga(),
        loadGroup(),
        editOrderSaga(),
        createNewGroup()
    ])
}

export {rootSaga}
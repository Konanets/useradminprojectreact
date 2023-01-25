import {combineReducers, applyMiddleware, createStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';


import {authReducer, orderReducer} from "./slices";
import {rootSaga} from "./sagas";

const rootReducer = combineReducers({
    authReducer,
    orderReducer
})

function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run(rootSaga)
  }
}


const store = configureStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {store}
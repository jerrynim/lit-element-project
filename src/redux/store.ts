import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import portfolio, { porfolioSaga } from "./portfolio";
import todo from "./todo";
import createSagaMiddleware, { Task } from "redux-saga";
import { Store } from "redux";
import { all, fork } from "redux-saga/effects";

const rootReducer = combineReducers({
  todos: todo.reducer,
  portfolio: portfolio.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
  }),
  sagaMiddleware,
];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
});

export function* rootSaga() {
  yield all([fork(porfolioSaga)]);
}

export interface SagaStore extends Store {
  sagaTask?: Task;
}

(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

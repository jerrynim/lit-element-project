import { combineReducers, configureStore } from "@reduxjs/toolkit";
import portfolio from "./portfolio";
import todo from "./todo";

const rootReducer = combineReducers({
  todos: todo.reducer,
  portfolio: portfolio.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type FilterType = "All" | "Active" | "Completed";

export type Todo = {
  id: number;
  task: string;
  complete: boolean;
};

interface TodoState {
  todos: Todo[];
  filter: FilterType;
}

//* 초기 상태
const initialState: TodoState = {
  todos: [],
  filter: "All",
};

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const lastTodoIndex = state.todos?.[state.todos.length + 1]?.id;

      state.todos = [
        ...state.todos,
        {
          id: lastTodoIndex || 1,
          task: action.payload,
          complete: false,
        },
      ];
    },
    updateFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload;
    },
    clearCompleted(state, action: PayloadAction<undefined>) {
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.complete),
      };
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...action.payload, complete: !action.payload }
            : todo
        ),
      };
    },
  },
});

const getTodosSelector = (state: RootState) => state.todos.todos;
const getFilterSelector = (state: RootState) => state.todos.filter;

export const getVisibleTodosSelector = createSelector(
  getTodosSelector,
  getFilterSelector,
  (todos, filter) => {
    switch (filter) {
      case "Active":
        return todos.filter((todo: Todo) => !todo.complete);
      case "Completed":
        return todos.filter((todo: Todo) => todo.complete);
      default:
        return todos;
    }
  }
);

export const todoActions = { ...todo.actions };

export default todo;

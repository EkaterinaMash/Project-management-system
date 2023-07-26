import {createAction, createReducer, on} from "@ngrx/store";
import {initialColumnsState, initialSelectedColumnState, initialTasksState} from "../column-state.model";
import {clearTasks, getColumns, getTasks, setSelectedColumn} from "../actions/column.actions";

export const columnsReducer = createReducer(
  initialColumnsState,
  on(getColumns, (state, {columns}) => {
    return columns;
  }),
)

export const tasksReducer = createReducer(
  initialTasksState,
  on(getTasks, (state, {tasks}) => {
    const clone = state.slice();
    clone.push(...tasks);
    return clone;
  }),
  on(clearTasks, state => {
    return []
  })
)

/*
export const selectedColumnReducer = createReducer(
  initialSelectedColumnState,
  on(setSelectedColumn, (state, {selectedColumn}) => ({
    ...state,
    selectedColumn: selectedColumn
  }))
)*/

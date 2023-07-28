import {createAction, createReducer, on} from "@ngrx/store";
import {initialColumnsState, initialSelectedColumnState, initialTasksState} from "../column-state.model";
import {addColumn, clearTasks, getColumns, getTasks, removeColumn, setSelectedColumn} from "../actions/column.actions";

export const columnsReducer = createReducer(
  initialColumnsState,
  on(getColumns, (state, {columns}) => {
    return columns;
  }),
  on(addColumn, (state, {newColumn}) => {
    const clone = state.slice();
    clone.push(newColumn);
    return clone;
  }),
  on(removeColumn, (state, {removedColumn}) => {
    const clone = state.slice();
    const columnToRemove = clone.find(column => column._id === removedColumn._id);
    const index = clone.indexOf(columnToRemove);
    clone.splice(index, 1);
    return clone;
  })
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

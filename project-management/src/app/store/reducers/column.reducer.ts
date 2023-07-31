import {createAction, createReducer, on} from "@ngrx/store";
import {initialColumnsState, initialSelectedColumnState, initialTasksState} from "../column-state.model";
import {
  addColumn, addTask, changeColumnsOrder,
  clearTasks,
  getColumns,
  getTasks,
  removeColumn,
  removeTask,
} from "../actions/column.actions";

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
    const clone = JSON.parse(JSON.stringify(state));
    const columnToRemove = clone.find(column => column._id === removedColumn._id);
    const index = clone.indexOf(columnToRemove);
    clone.splice(index, 1);
    for (let i = index; i < clone.length; i++) {
      clone[i].order = i;
    }
    return clone;
  }),
  on(changeColumnsOrder, (state, {changedColumns}) => {
    return changedColumns;
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
  }),
  on(addTask, (state, {newTask}) => {
    const clone = state.slice();
    clone.push(newTask);
    return clone;
  }),
  on(removeTask, (state, {removedTask}) => {
    const clone = state.slice();
    const taskToRemove = clone.find(task => task._id === removedTask._id);
    const index = clone.indexOf(taskToRemove);
    clone.splice(index, 1);
    return clone;
  })
)

import {createAction, createActionGroup, props} from "@ngrx/store";
import {ColumnType} from "../../shared/types/column-type.model";
import {TaskType} from "../../shared/types/task-type.model";

export const getColumns = createAction(
  '[Selected board] get columns', props< {columns: ColumnType[]}>());
export const setSelectedColumn = createAction(
  '[Selected board] set selected column', props<{selectedColumn: ColumnType}>());

export const getTasks = createAction(
  '[Selected column] get tasks', props<{tasks: TaskType[]}>()
)
export const clearTasks = createAction(
  '[Selected column] clear column tasks'
)

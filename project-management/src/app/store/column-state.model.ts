import {ColumnType} from "../shared/types/column-type.model";
import {TaskType} from "../shared/types/task-type.model";

export const initialColumnsState: ColumnType[] = [];
export const initialTasksState: TaskType[] = [];

export interface selectedColumnState {
  selectedColumn: ColumnType | undefined
}
export const initialSelectedColumnState: selectedColumnState = {
  selectedColumn: undefined
}

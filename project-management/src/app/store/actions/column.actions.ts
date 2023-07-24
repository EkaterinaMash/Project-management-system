import {createAction, createActionGroup, props} from "@ngrx/store";
import {ColumnType} from "../../shared/types/column-type.model";

export const ColumnsActions = createActionGroup({
  source: 'Columns',
  events: {
    'Add Column': props<{ column: ColumnType}>(),
    'Remove Column': props<{ column: ColumnType }>(),
  },
});

export const ColumnsApiActions = createActionGroup({
  source: 'Columns API',
  events: {
    'Get Columns List': props<{ columns: ColumnType[] }>(),
  },
});

export const getColumns = createAction(
  '[Selected board] get columns', props< {columns: ColumnType[]}>());
export const setSelectedColumn = createAction(
  '[Selected board] set selected column', props<{selectedColumn: ColumnType}>());

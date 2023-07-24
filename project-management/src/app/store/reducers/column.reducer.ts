import {createReducer, on} from "@ngrx/store";
import {initialColumnsState} from "../board-state.model";
import {getColumns} from "../actions/column.actions";

export const columnsReducer = createReducer(
  initialColumnsState,
  on(getColumns, (state, {columns}) => {
    console.log(columns, state);
    return columns;
  })
)

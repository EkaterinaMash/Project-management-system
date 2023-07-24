import {createReducer, on} from "@ngrx/store";
import {initialColumnsState, initialSelectedColumnState} from "../column-state.model";
import {getColumns, setSelectedColumn} from "../actions/column.actions";

export const columnsReducer = createReducer(
  initialColumnsState,
  on(getColumns, (state, {columns}) => {
    return columns;
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

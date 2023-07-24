import {ColumnType} from "../shared/types/column-type.model";

export const initialColumnsState: ColumnType[] = [];

export interface selectedColumnState {
  selectedColumn: ColumnType | undefined
}
export const initialSelectedColumnState: selectedColumnState = {
  selectedColumn: undefined
}

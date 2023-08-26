import {BoardType} from "../shared/types/board-type.model";
import {ColumnType} from "../shared/types/column-type.model";

export interface BoardState {
  id: string,
  title: string,
  owner: string,
  users: any[],
  description: string,
  columns: ColumnType[]
}

export const initialBoardState: BoardState = {
  id: '',
  title: '',
  owner: '',
  users: [],
  description: '',
  columns: []
}

export interface BoardsState {
  boards: BoardType[] | undefined;
}

export const initialState: BoardsState = {
  boards: undefined,
};

export const initialBoardsState: BoardType[] = [];
export const initialBoardsListState: string[] = [];

export interface SelectedBoardState {
  selectedBoard: BoardType | undefined;
  selectedBoardColumns: ColumnType[],
}

export const initialSelectedBoardState: SelectedBoardState = {
  selectedBoard: undefined,
  selectedBoardColumns: undefined
}



import {BoardType} from "../shared/types/board-type.model";

export interface BoardState {
  id: string,
  title: string,
  owner: string,
  users: any[],
  description: string
}

export const initialBoardState: BoardState = {
  id: '',
  title: '',
  owner: '',
  users: [],
  description: ''
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
  selectedBoardId: string;
}

export const initialSelectedBoardState: SelectedBoardState = {
  selectedBoard: undefined,
  selectedBoardId: ''
}


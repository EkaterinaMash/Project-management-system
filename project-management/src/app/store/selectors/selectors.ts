import {createSelector, createFeatureSelector, createReducer} from "@ngrx/store";
import {BoardType} from "../../shared/types/board-type.model";
import {GeneralState} from "../state.model";
import {BoardsState, BoardState, SelectedBoardState} from "../board-state.model";
import {Board} from "../board.model";


export const selectBoards = createFeatureSelector<BoardType[]>('boards');
/* export const selectListState = createFeatureSelector<string[]>('boardsList');
export const getSelectedBoardState = (state: GeneralState) => state.selectedBoard;
export const getSelectedBoard = createSelector(
  getSelectedBoardState,
  (state: SelectedBoardState) => state.selectedBoard
);
export const getSelectedBoardId = createSelector(
  getSelectedBoardState,
  (state: SelectedBoardState) => state.selectedBoardId
); */

/*export const selectBoardsList = createSelector(
  selectBoards,
  selectListState,
  (boards, boardsList) => {
    return boardsList.map((id) => boards.find((board) => board.id === id)!);
  }
)*/

//export const selectBoards =(state: GeneralState) => state.boards.boards;
export const selectBoardState = (state: GeneralState) => state.selectedBoard;

export const selectBoard = createSelector(
  selectBoardState,
  (state: SelectedBoardState) => {
    return state.selectedBoard
  }
);

export const selectColumn = createSelector(
  selectBoardState,
  (state: SelectedBoardState) => {
    return state.selectedBoard?.columns
  }
);
/*
export const selectBoardId = createSelector(
  selectBoardState,
  (state: SelectedBoardState) => {
    console.log(10);
    return state.selectedBoardId
  }
);*/










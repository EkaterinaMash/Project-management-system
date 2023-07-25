import {createReducer, on} from "@ngrx/store";
import {
  addNewBoard,
  getSelectedBoardById, getSelectedBoardByIdError, getSelectedBoardByIdSuccess,
  setSelectedBoard, getBoardsList
} from "../actions/board.action";
import {
  initialBoardsState,
  initialSelectedBoardState,
} from "../board-state.model";
import {setSelectedBoardId} from "../actions/board.action";

export const boardsReduceraaaa = createReducer(
  initialBoardsState,
  on(getBoardsList, (state, {boards}) => {
    return boards;
  }),
  on(addNewBoard, (state, {newBoard}) => {
    const clone = state.slice();
    clone.push(newBoard);
    return clone;
  })
)

export const selectedBoardReducer = createReducer(
  initialSelectedBoardState,
  on(setSelectedBoardId, (state, {selectedBoardId}) => ({
    ...state,
    selectedBoardId: selectedBoardId
  })),
  on(setSelectedBoard, (state, {selectedBoard}) => ({
    ...state,
    selectedBoard: selectedBoard
  })),
  on(getSelectedBoardById, (state) => {
    return {...state};
  }),
  on(getSelectedBoardByIdSuccess, (state, {selectedBoard}) => {
    return {...state, selectedBoard};
  }),
  on(getSelectedBoardByIdError, (state, {error}) => {
    return {...state, error}
  }),
)







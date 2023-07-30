import {createReducer, on} from "@ngrx/store";
import {
  addNewBoard,
  setSelectedBoard, getBoardsList
} from "../actions/board.action";
import {
  initialBoardsState,
  initialSelectedBoardState,
} from "../board-state.model";

export const boardsReducer = createReducer(
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
  on(setSelectedBoard, (state, {selectedBoard}) => ({
    ...state,
    selectedBoard: selectedBoard
  })),

)







import {createReducer, on} from "@ngrx/store";
import {
  BoardsActions,
  BoardsApiActions,
  getBoardItem,
  getSelectedBoardById, getSelectedBoardByIdError, getSelectedBoardByIdSuccess,
  setSelectedBoard
} from "../actions/board.action";
import {
  initialBoardsState,
  initialBoardState,
  initialSelectedBoardState,
  initialState
} from "../board-state.model";
import {setSelectedBoardId} from "../actions/board.action";

export const boardsReduceraaaa = createReducer(
  initialBoardsState,
  on(BoardsApiActions.getBoardList, (state, {boards}) => {
    return boards;
  }),
)

export const boardItemReducer = createReducer(
  initialBoardState,
  on(getBoardItem, (state) => state)
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
  })
)

export const boardAddReducer = createReducer(
  initialState,
  on(BoardsActions.addBoard, (state, {board}) => {
    const clone = Object.assign({}, state);
    if (!clone.boards) clone.boards = [];
    return {
      ...clone,
      boards: [...clone.boards, board],
    };
  }),
  on(getBoardItem, (state) => {
    return {...state}
  })
)






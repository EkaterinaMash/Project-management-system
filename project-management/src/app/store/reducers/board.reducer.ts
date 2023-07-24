import {createReducer, on} from "@ngrx/store";
import {
  BoardsActions,
  BoardsApiActions,
  getBoardItem,
  getSelectedBoardById, getSelectedBoardByIdError, getSelectedBoardByIdSuccess, setBoardColumn,
  setSelectedBoard, setSelectedBoardColumn
} from "../actions/board.action";
import {
  initialBoardsState,
  initialBoardState,
  initialSelectedBoardState,
  initialState
} from "../board-state.model";
import {setSelectedBoardId} from "../actions/board.action";
import {selectBoard} from "../selectors/selectors";
import {logout} from "../actions/auth.actions";

export const boardsReduceraaaa = createReducer(
  initialBoardsState,
  on(BoardsApiActions.getBoardList, (state, {boards}) => {
    return boards;
  }),
  on(setSelectedBoardColumn, (state, {column}) => {
    const clone = JSON.parse(JSON.stringify(state));
    clone.forEach(board => {
      console.log(board._id === column.boardId, board.columns);
      if (board._id === column.boardId) {
        if (!board.columns) board.columns = [];
        board.columns.push(column);
      }
    });
    console.log(clone);
    return clone;
  })

  /*on(setSelectedBoardColumn, (state, {column}) => {
    console.log('set column');
    const clone = JSON.parse(JSON.stringify(state));
    if (!clone.selectedBoard.columns) clone.selectedBoard.columns = [];
    clone.selectedBoard.columns.push(column);
    return {
      ...clone,
      selectedBoard: {
        ...clone.selectedBoard,
        ...clone.selectedBoard.columns
      }
    }
  })*/
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
  }),
  /*
  on(setSelectedBoardColumn, (state, {column}) => {
    const clone = JSON.parse(JSON.stringify(state));
    if (!clone.selectedBoard.columns) clone.selectedBoard.columns = [];
    clone.selectedBoard.columns.push(column);
    return clone;
  })*/
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
  }),
  on(setBoardColumn, (state, {column}) => {
    console.log('reducer works');
    const clone = JSON.parse(JSON.stringify(state));
    if (clone.boards) {
      clone.boards.forEach(board => {
        if (board._id === column.boardId) {
          if (!board.columns) board.columns = [];
          board.columns.push(column);
        }
      });
    }
    console.log(13, clone.boards);
    return clone;
  })
)






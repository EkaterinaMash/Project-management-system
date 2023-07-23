import {boardAddReducer, boardsReduceraaaa, selectedBoardReducer} from "./reducers/board.reducer";
import {BoardsState, SelectedBoardState} from "./board-state.model";
import {SelectedUserState, UserState} from "./users-state.model";

export const generalState = {
  boards: boardsReduceraaaa,
  selectedBoard: selectedBoardReducer,
  boardAdd: boardAddReducer
}

export interface GeneralState {
  boards: BoardsState
  selectedBoard: SelectedBoardState,
  users: UserState,
  selectedUser: SelectedUserState
}





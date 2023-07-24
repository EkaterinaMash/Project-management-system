import {boardAddReducer, boardsReduceraaaa, selectedBoardReducer} from "./reducers/board.reducer";
import {BoardsState, SelectedBoardState} from "./board-state.model";
import {SelectedUserState, UserState} from "./users-state.model";
import {usersReducer} from "./reducers/users.reducer";
import {columnsReducer} from "./reducers/column.reducer";
import {ColumnType} from "../shared/types/column-type.model";
import {selectedColumnState} from "./column-state.model";

export const generalState = {
  boards: boardsReduceraaaa,
  selectedBoard: selectedBoardReducer,
  users: usersReducer,
  columns: columnsReducer,
  boardsAdd: boardAddReducer,
}

export interface GeneralState {
  boards: BoardsState
  selectedBoard: SelectedBoardState,
  users: UserState,
  selectedUser: SelectedUserState,
  columns: ColumnType[],
}





import {createSelector, createFeatureSelector, createReducer} from "@ngrx/store";
import {BoardType} from "../../shared/types/board-type.model";
import {GeneralState} from "../state.model";
import {SelectedBoardState} from "../board-state.model";
import {UserState} from "../users-state.model";

export const selectBoards = createFeatureSelector<BoardType[]>('boards');
export const selectBoardState = (state: GeneralState) => state.selectedBoard;
export const selectUsersState = (state: GeneralState) => state.users;

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

export const selectUser = createSelector(
  selectUsersState,
  (state: UserState) => {
  }
)

export const selectUsers = createSelector(
  selectUsersState,
  (state: UserState) => {
    return state.users
  }
)

export const selectBoardColumns = (state: GeneralState) => state.columns;
export const selectColumnTasks = (state: GeneralState) => state.tasks;










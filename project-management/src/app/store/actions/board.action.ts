import {createAction, props} from '@ngrx/store';
import {BoardType} from "../../shared/types/board-type.model";

export const getBoardsList = createAction(
  '[Boards] get boards list', props<{boards: BoardType[]}>()
)
export const addNewBoard = createAction('[Boards] add new board', props<{newBoard: BoardType}>());

export const setSelectedBoard = createAction(
  '[Selected boards] set selected board', props<{selectedBoard: BoardType}>());
export const setSelectedBoardId = createAction(
  '[Selected board] set selected board by id', props<{selectedBoardId: string}>());
export const getSelectedBoardById = createAction(
  '[Selected board page] get board by id');
export const getSelectedBoardByIdSuccess = createAction(
'[Selected board effect] get board by id success', props<{selectedBoard: BoardType}>()
);
export const getSelectedBoardByIdError = createAction(
  '[Selected board effect] get board by id error', props<{error: Error}>()
)






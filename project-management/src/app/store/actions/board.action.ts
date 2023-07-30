import {createAction, props} from '@ngrx/store';
import {BoardType} from "../../shared/types/board-type.model";

export const getBoardsList = createAction(
  '[Boards] get boards list', props<{boards: BoardType[]}>()
)
export const addNewBoard = createAction('[Boards] add new board', props<{newBoard: BoardType}>());

export const setSelectedBoard = createAction(
  '[Selected boards] set selected board', props<{selectedBoard: BoardType}>());







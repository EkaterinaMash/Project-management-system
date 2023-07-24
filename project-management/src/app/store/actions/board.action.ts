import {createAction, createActionGroup, props} from '@ngrx/store';
import {BoardType} from "../../shared/types/board-type.model";
import {BoardItem} from "../board.model";
import {ColumnType} from "../../shared/types/column-type.model";

export const BoardsActions = createActionGroup({
  source: 'Boards',
  events: {
    'Add Board': props<{ board: BoardType}>(),
    'Remove Board': props<{ board: BoardType }>(),
  },
});

export const BoardsApiActions = createActionGroup({
  source: 'Boards API',
  events: {
    'Get Board List': props<{ boards: BoardType[] }>(),
  },
});

export const loadBoards = createAction('[Boards] load boards');
export const loadBoardsSuccess = createAction(
  '[Boards] load boards success', props<{boards: BoardItem[]}>);

export const getBoards = createAction('[Boards] get boards');
export const getBoardsSuccess = createAction('[Boards] get boards success', props<{boards: BoardType[]}>)
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

export const setSelectedBoardColumn = createAction(
  '[Selected board] set selected board column', props<{column: ColumnType}>()
);

export const setBoardColumn = createAction(
  '[Selected board] set board column', props<{column: ColumnType}>()
)



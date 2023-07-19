import {boardsReduceraaaa, selectedBoardReducer} from "./reducers/board.reducer";
import {BoardsState, SelectedBoardState} from "./board-state.model";

export const generalState = {
  boards: boardsReduceraaaa,
  selectedBoard: selectedBoardReducer
}

export interface GeneralState {
  boards: BoardsState
  selectedBoard: SelectedBoardState
}





import {Component, Input} from '@angular/core';
import {BoardType} from "../../../../shared/types/board-type.model";
import {BoardService} from "../../../../shared/services/board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {SelectedBoardState} from "../../../../store/board-state.model";
import {setSelectedBoard} from "../../../../store/actions/board.action";

@Component({
  selector: 'app-open-board',
  templateUrl: './open-board.component.html',
  styleUrls: ['./open-board.component.scss']
})
export class OpenBoardComponent {
  @Input() board: BoardType | undefined

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              private store: Store<SelectedBoardState>,
              private router: Router) {
  }

  openBoard(board: BoardType) {
    const selectedBoard = board;
    this.store.dispatch(setSelectedBoard({selectedBoard}));
    this.router.navigate(['boardItem']);
  }

}

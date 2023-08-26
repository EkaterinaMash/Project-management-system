import {Component, Input, OnInit,} from '@angular/core';
import {BoardType} from "../../../../shared/types/board-type.model";
import {GeneralState} from "../../../../store/state.model";
import {Store} from "@ngrx/store";
import {BoardService} from "../../../../shared/services/board.service";
import {getBoardsList} from "../../../../store/actions/board.action";

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {
  @Input() boards: BoardType[] = [];

  constructor(
    private boardService: BoardService,
    private store: Store<GeneralState>,
  ) {
  }

  ngOnInit() {
    this.boardService
      .getBoards()
      .subscribe((boards) => {
        this.store.dispatch(getBoardsList({boards}))
      });
  }
}

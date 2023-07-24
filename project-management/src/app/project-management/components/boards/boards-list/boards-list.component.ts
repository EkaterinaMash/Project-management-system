import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {BoardType} from "../../../../shared/types/board-type.model";
import {GeneralState} from "../../../../store/state.model";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectBoards} from "../../../../store/selectors/selectors";
import {map, Observable} from "rxjs";
import {BoardService} from "../../../../shared/services/board.service";
import {BoardsApiActions, getBoards} from "../../../../store/actions/board.action";

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit{
  @Input() boards: BoardType[] = [];
//  boards$: Observable<BoardType[] | undefined> = this.store.select(selectBoards);

  constructor(
    private boardService: BoardService,
    private store: Store<GeneralState>,
  ) {}

  ngOnInit() {
    this.boardService
      .getBoards()
      .subscribe((boards) => {
        this.store.dispatch(BoardsApiActions.getBoardList({boards}))
      });
    console.log(this.boards);
  }
}

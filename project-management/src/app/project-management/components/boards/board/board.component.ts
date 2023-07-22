import {Component, OnInit} from '@angular/core';
import {BoardType} from "../../../../shared/types/board-type.model";
import {select, Store} from "@ngrx/store";
import {GeneralState} from "../../../../store/state.model";
import {Router} from "@angular/router";
import {selectBoard} from "../../../../store/selectors/selectors";
import {BoardService} from "../../../../shared/services/board.service";
import {take} from "rxjs";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  board: BoardType | undefined
  constructor(private store: Store<GeneralState>,
              private router: Router,
              private boardService: BoardService) {
  }

  ngOnInit() {
    if (this.router.url.includes('boardItem')) {
      this.store
        .pipe(select(selectBoard))
        .subscribe(value => {
          this.board = value;
        });
    }
  }

  deleteBoard() {
    this.boardService.deleteBoard(this.board._id).pipe(take(1)).subscribe()
  }

  createColumn() {
    this.router.navigate(['columns'])
  }

}

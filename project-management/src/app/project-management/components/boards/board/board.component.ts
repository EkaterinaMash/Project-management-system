import {Component, OnInit} from '@angular/core';
import {BoardType} from "../../../../shared/types/board-type.model";
import {select, Store} from "@ngrx/store";
import {GeneralState} from "../../../../store/state.model";
import {Router} from "@angular/router";
import {selectBoard} from "../../../../store/selectors/selectors";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  board: BoardType | undefined
  constructor(private store: Store<GeneralState>,
              private router: Router) {
  }

  ngOnInit() {
    if (this.router.url.includes('boardItem')) {
      this.store
        .pipe(select(selectBoard))
        .subscribe(value => {
          this.board = value;
        });
      console.log(1, this.board);

    }
  }

}

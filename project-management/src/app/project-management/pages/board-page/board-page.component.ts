import {AfterContentChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {BoardType} from "../../../shared/types/board-type.model";
import {Observable} from "rxjs";
import {selectBoards} from "../../../store/selectors/selectors";
import {BoardService} from "../../../shared/services/board.service";
import {BoardsActions, BoardsApiActions} from "../../../store/actions/board.action";
import {ChangeDetectorRef} from "@angular/core";

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  boards$ = this.store.select(selectBoards);

  constructor(private boardService: BoardService,
              private store: Store,
  ) {
  }

  ngOnInit() {

  }
}

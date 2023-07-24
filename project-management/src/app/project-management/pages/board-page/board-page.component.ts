import {AfterContentChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {BoardType} from "../../../shared/types/board-type.model";
import {Observable} from "rxjs";
import {selectBoards} from "../../../store/selectors/selectors";
import {BoardService} from "../../../shared/services/board.service";
import {BoardsActions, BoardsApiActions} from "../../../store/actions/board.action";
import {ChangeDetectorRef} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {CreateBoardComponent} from "../../components/boards/create-board/create-board.component";

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent  {
  boards$ = this.store.select(selectBoards);

  constructor(private boardService: BoardService,
              private store: Store,
              private dialog: MatDialog
  ) {
  }

  openBoardForm() {
    this.dialog.open(CreateBoardComponent, {
      width: '500px',
      height: '500px'
    })
  }
}

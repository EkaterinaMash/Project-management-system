import {Component, OnInit} from '@angular/core';
import {BoardType} from "../../../../shared/types/board-type.model";
import {select, Store} from "@ngrx/store";
import {GeneralState} from "../../../../store/state.model";
import {Router} from "@angular/router";
import {selectBoard} from "../../../../store/selectors/selectors";
import {BoardService} from "../../../../shared/services/board.service";
import {take} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {CreateColumnComponent} from "../../columns/create-column/create-column.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  board: BoardType | undefined
  delete: boolean = false;

  constructor(private store: Store<GeneralState>,
              private router: Router,
              private boardService: BoardService,
              private dialog: MatDialog) {
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
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {title: this.board.title, item: 'board'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.delete = result.data;
      if (this.delete) this.boardService.deleteBoard(this.board._id).pipe(take(1)).subscribe()});
  }

  createColumn() {
    this.dialog.open(CreateColumnComponent, {
      width: '300px',
      height: '300px',
      data: {boardId: this.board._id}
    })
  }
}

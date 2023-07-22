import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ColumnService} from "../../../../shared/services/column.service";
import {Store} from "@ngrx/store";
import {GeneralState} from "../../../../store/state.model";
import {BoardType} from "../../../../shared/types/board-type.model";
import {selectBoard} from "../../../../store/selectors/selectors";
import {ColumnType, ColumnData} from "../../../../shared/types/column-type.model";
import {BoardsApiActions, setBoardColumn, setSelectedBoardColumn} from "../../../../store/actions/board.action";
import {BoardService} from "../../../../shared/services/board.service";

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss']
})
export class CreateColumnComponent implements OnInit {
  createColumnForm!: FormGroup;

  selectedBoard: BoardType | undefined
  selectedBoardId: string | undefined
  columnData: ColumnData | undefined

  constructor(private fb: FormBuilder,
              private columnService: ColumnService,
              private boardService: BoardService,
              private store: Store<GeneralState>
  ) {
  }

  ngOnInit(): void {
    this.createColumnForm = this.fb.group({
      title: ['', [Validators.required]],
      order: ['', [Validators.required]]
    })

    this.boardService
      .getBoards()
      .subscribe((boards) => {
        this.store.dispatch(BoardsApiActions.getBoardList({boards}))
      });
  }

  onSubmit() {
    this.store
      .select(selectBoard)
      .subscribe(board => this.selectedBoard = board);
    this.selectedBoardId = this.selectedBoard._id;

    /* if (this.createColumnForm?.valid) {
       console.log('valid');
       this.columnService
         .createColumn(this.selectedBoardId, this.createColumnForm.value)
         .subscribe((column: ColumnType) => {
           this.store.dispatch(setSelectedBoardColumn({column: column as ColumnType}))
         })
     }*/
    if (this.createColumnForm?.valid) {
      console.log('valid');
      this.columnService
        .createColumn(this.selectedBoardId, this.createColumnForm.value)
        .subscribe((column: ColumnType) => {
          console.log('sub ' + column.boardId);
          this.store.dispatch(setBoardColumn({column: column as ColumnType}))
        })
    }
  }

  get title() {
    return this.createColumnForm!.get('title')
  }

}

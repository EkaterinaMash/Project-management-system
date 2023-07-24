import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ColumnService} from "../../../../shared/services/column.service";
import {select, Store} from "@ngrx/store";
import {GeneralState} from "../../../../store/state.model";
import {BoardType} from "../../../../shared/types/board-type.model";
import {selectBoard, selectBoardColumns} from "../../../../store/selectors/selectors";
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

  columns: ColumnType[] | undefined;
  columnOrder: number;
  selectedBoard: BoardType | undefined;
  selectedBoardId: string | undefined;
  columnData: ColumnData | undefined;
  created: boolean = false;

  constructor(private fb: FormBuilder,
              private columnService: ColumnService,
              private boardService: BoardService,
              private store: Store<GeneralState>
  ) {
  }

  ngOnInit(): void {
    this.boardService
      .getBoards()
      .subscribe((boards) => {
        this.store.dispatch(BoardsApiActions.getBoardList({boards}))
      });
    this.generateColumnOrder();

    this.createColumnForm = this.fb.group({
      title: ['', [Validators.required]],
      order: [this.columnOrder]
    })
  }

  onSubmit() {
    this.store
      .select(selectBoard)
      .subscribe(board => this.selectedBoard = board);
    this.selectedBoardId = this.selectedBoard._id;

    if (this.createColumnForm?.valid) {
      this.columnService
        .createColumn(this.selectedBoardId, this.createColumnForm.value)
        .subscribe((column: ColumnType) => {
          this.store.dispatch(setSelectedBoardColumn({column: column as ColumnType}))
        })
    }
    this.created = true;
  }

  generateColumnOrder() {
    this.store
      .pipe(select(selectBoardColumns))
      .subscribe(value => {this.columns = value});
    if (!this.columns) this.columnOrder = 1;
    if (this.columns) this.columnOrder = this.columns.length + 1;
    console.log(this.columnOrder, 0);
  }

  get title() {
    return this.createColumnForm!.get('title')
  }

}

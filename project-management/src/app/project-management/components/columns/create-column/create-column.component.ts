import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ColumnService} from "../../../../shared/services/column.service";
import {select, Store} from "@ngrx/store";
import {GeneralState} from "../../../../store/state.model";
import {BoardType} from "../../../../shared/types/board-type.model";
import {selectBoardColumns} from "../../../../store/selectors/selectors";
import {ColumnType} from "../../../../shared/types/column-type.model";
import {BoardService} from "../../../../shared/services/board.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss']
})
export class CreateColumnComponent implements OnInit {
  createColumnForm!: FormGroup;

  columns: ColumnType[] | undefined;
  columnOrder: number;
  created: boolean = false;
  boardId: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private columnService: ColumnService,
              private boardService: BoardService,
              private store: Store<GeneralState>,
  ) {
  }

  ngOnInit(): void {
    this.boardId = this.data.boardId;
    this.generateColumnOrder();

    this.createColumnForm = this.fb.group({
      title: ['',
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      order: [this.columnOrder]
    })
  }

  onSubmit() {
    if (this.createColumnForm?.valid) {
      this.columnService
        .createColumn(this.boardId, this.createColumnForm.value).subscribe();
    }
    this.created = true;
  }

  generateColumnOrder() {
    this.store
      .pipe(select(selectBoardColumns))
      .subscribe(value => {
        this.columns = value
      });
    if (!this.columns) this.columnOrder = 1;
    if (this.columns) this.columnOrder = this.columns.length + 1;
  }

  get title() {
    return this.createColumnForm!.get('title')
  }

}

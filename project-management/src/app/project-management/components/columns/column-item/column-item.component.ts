import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Input} from "@angular/core";
import {ColumnType} from "../../../../shared/types/column-type.model";
import {GeneralState} from "../../../../store/state.model";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {getTasks, setSelectedColumn} from "../../../../store/actions/column.actions";
import {ColumnService} from "../../../../shared/services/column.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {CreateTaskComponent} from "../../tasks/create-task/create-task.component";
import {TasksService} from "../../../../shared/services/tasks.service";
import {TaskType} from "../../../../shared/types/task-type.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss']
})
export class ColumnItemComponent implements OnInit {
  @Input() inputColumn: ColumnType | undefined;
  @Output() deleteColumnEvent = new EventEmitter<ColumnType>;
  editTitleForm!: FormGroup;

  column: ColumnType | undefined;
  delete: boolean = false;
  boardId: string;
  columnId: string;
  tasks: TaskType[] = [];
  editMode: boolean = false;

  constructor(private store: Store<GeneralState>,
              private router: Router,
              private columnService: ColumnService,
              private tasksService: TasksService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.column = Object.assign({}, this.inputColumn);
    this.columnId = this.column._id;
    this.boardId = this.column.boardId;

    this.editTitleForm = this.fb.group({
      title: ['',
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      order: [this.column.order]
    })
  }

  deleteColumn() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {title: this.column.title, item: 'column'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.delete = result.data;
      if (this.delete) {
        this.columnService.deleteColumn(this.boardId, this.columnId).subscribe();
        this.deleteColumnEvent.emit(this.column);
        this.delete = false;
      }
    })
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  editColumnTitle() {
    this.columnService.updateColumn(this.boardId, this.columnId, this.editTitleForm.value).subscribe();
    this.column.title = this.editTitleForm.value.title;
    this.toggleEditMode();
  }

  createTask() {
    this.dialog.open(CreateTaskComponent, {
      width: '300px',
      height: '300px',
      data: {boardId: this.boardId, columnId: this.columnId}
    })
  }
}

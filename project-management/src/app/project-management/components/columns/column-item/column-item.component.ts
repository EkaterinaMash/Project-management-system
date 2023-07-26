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


@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss']
})
export class ColumnItemComponent implements OnInit {
  @Input() column: ColumnType | undefined;
  @Output() deleteColumnEvent = new EventEmitter<ColumnType>;

  delete: boolean = false;
  boardId: string;
  columnId: string;
  tasks: TaskType[] = [];

  constructor(private store: Store<GeneralState>,
              private router: Router,
              private columnService: ColumnService,
              private tasksService: TasksService,
              private dialog: MatDialog) {
  }

  ngOnInit() {}

  deleteColumn() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {title: this.column.title, item: 'column'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.delete = result.data;
      if (this.delete) {
        this.columnService.deleteColumn(this.column.boardId, this.column._id).subscribe();
        this.deleteColumnEvent.emit(this.column);
        this.delete = false;
      }
    })
  }

  createTask() {
    this.dialog.open(CreateTaskComponent, {
      width: '300px',
      height: '300px',
      data: {boardId: this.column.boardId, columnId: this.column._id}
    })
  }
}

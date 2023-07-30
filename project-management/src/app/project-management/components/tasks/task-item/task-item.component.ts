import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskType} from "../../../../shared/types/task-type.model";
import {TasksService} from "../../../../shared/services/tasks.service";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {MatDialog} from "@angular/material/dialog";
import {removeTask} from "../../../../store/actions/column.actions";
import {GeneralState} from "../../../../store/state.model";
import {Store} from "@ngrx/store";
import {EditTaskComponent} from "../edit-task/edit-task.component";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() taskInput: TaskType | undefined;
  @Input() columnId: string;
  @Output() deleteTaskEvent = new EventEmitter<TaskType>;
  task: TaskType | undefined;
  boardId: string;
  taskId: string;
  delete: boolean = false;

  constructor(private tasksService: TasksService,
              private dialog: MatDialog,
              private store: Store<GeneralState>) {
  }

  ngOnInit() {
    this.task = Object.assign({}, this.taskInput);
    this.boardId = this.task.boardId;
    this.taskId = this.task._id;
  }

  deleteTask() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {title: this.task.title, item: 'task'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete = result.data;
        if (this.delete) {
          this.tasksService
            .deleteTask(this.boardId, this.columnId, this.taskId)
            .subscribe((data: TaskType) => {
              this.store.dispatch(removeTask({removedTask: data}));
            });
          this.deleteTaskEvent.emit(this.task);
          this.delete = false;
        }
      }
    });
  }

  editTask() {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: {
        boardId: this.boardId,
        columnId: this.columnId,
        taskId: this.taskId,
        taskOrder: this.task.order
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.task.title = result.data.title;
      this.task.description = result.data.description;
    })
  }
}

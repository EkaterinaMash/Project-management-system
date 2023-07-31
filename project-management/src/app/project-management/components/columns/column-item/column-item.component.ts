import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Input} from "@angular/core";
import {ColumnType} from "../../../../shared/types/column-type.model";
import {GeneralState} from "../../../../store/state.model";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {clearTasks, getTasks, removeColumn} from "../../../../store/actions/column.actions";
import {ColumnService} from "../../../../shared/services/column.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {CreateTaskComponent} from "../../tasks/create-task/create-task.component";
import {TasksService} from "../../../../shared/services/tasks.service";
import {TaskBody, TaskType} from "../../../../shared/types/task-type.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";
import {selectColumnTasks} from "../../../../store/selectors/selectors";

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss']
})
export class ColumnItemComponent implements OnInit, OnDestroy {
  @Input() inputColumn: ColumnType | undefined;
  @Output() deleteColumnEvent = new EventEmitter<number>;

  editTitleForm!: FormGroup;

  column: ColumnType | undefined;
  currentColumnTasks: TaskType[] = [];
  tasksBody: TaskBody[] = [];

  delete: boolean = false;
  add: boolean = false;
  editMode: boolean = false;
  dragged: boolean = false;
  boardId: string;
  columnId: string;
  currentColumnId: string;
  tasksSubscription: Subscription;

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
    this.loadTasks();

    this.editTitleForm = this.fb.group({
      title: ['',
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      order: [this.column.order]
    })
  }

  loadTasks() {
    this.tasksSubscription = this.tasksService
      .getTasks(this.boardId, this.columnId)
      .subscribe(tasks => {
        this.store.dispatch(getTasks({tasks}));
        this.selectTasks();
      });
  }

  selectTasks() {
    this.store
      .pipe(select(selectColumnTasks))
      .subscribe(value => {
        this.currentColumnTasks = value
          .filter(task => task.columnId === this.columnId)
          .sort((a, b) => a.order - b.order);
      });
  }

  dropTask(event: CdkDragDrop<TaskType[]>) {
    const currentTasksList = event.container.data;
    const previousTasksList = event.previousContainer.data;
    const currentIndex = event.currentIndex;
    const previousIndex = event.previousIndex;

    if (event.previousContainer === event.container) {
      moveItemInArray(currentTasksList, previousIndex, currentIndex);
      this.changeTasksOrderInColumn(currentIndex, previousIndex, currentTasksList);
    } else {
      this.currentColumnId = currentTasksList[0].columnId;

      transferArrayItem(
        previousTasksList,
        currentTasksList,
        previousIndex,
        currentIndex,
      );

      this.formTasksBody(event.container.data[event.currentIndex], event.currentIndex, this.currentColumnId);
      this.changePreviousContainerTasks(event.previousIndex, event.previousContainer.data);
      this.changeCurrentContainerTasks(event.currentIndex, event.container.data);
    }
    this.tasksService.updateTasksSet(this.tasksBody).subscribe();
    this.tasksBody = [];
  }

  changeCurrentContainerTasks(index, tasks) {
    if (index < tasks.length - 1) {
      for (let i = index + 1; i < tasks.length; i++) {
        this.formTasksBody(tasks[i], i)
      }
    }
  }

  changePreviousContainerTasks(index, tasks) {
    for (let i = index; i < tasks.length; i++) {
      this.formTasksBody(tasks[i], i)
    }
  }

  changeTasksOrderInColumn(currentIndex, previousIndex, tasks) {
    if (previousIndex < currentIndex) {
      for (let i = previousIndex; i <= currentIndex; i++) {
        this.formTasksBody(tasks[i], i);
      }
    } else {
      for (let i = currentIndex; i <= previousIndex; i++) {
        this.formTasksBody(tasks[i], i);
      }
    }
  }

  formTasksBody(currentTask, index, columnId?) {
      const task: TaskBody = {};
      task._id = currentTask._id;
      task.order = index;
      task.columnId = columnId ? columnId : currentTask.columnId;
      this.tasksBody.push(task);
  }

  deleteTask(deletedTaskOrder: number) {
    const taskIndex = deletedTaskOrder;
    this.currentColumnTasks.splice(taskIndex, 1);
    if (taskIndex !== this.currentColumnTasks.length) {
      for (let i = taskIndex; i < this.currentColumnTasks.length; i++) {
        this.formTasksBody(this.currentColumnTasks[i], i);
      }
      this.tasksService.updateTasksSet(this.tasksBody).subscribe();
    }
  }

  deleteColumn() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {title: this.column.title, item: 'column'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete = result.data;
        if (this.delete) {
          this.columnService
            .deleteColumn(this.boardId, this.columnId)
            .subscribe((data: ColumnType) => {
              this.store.dispatch(removeColumn({removedColumn: data}))
            });
          this.deleteColumnEvent.emit(this.column.order);
          this.delete = false;
        }
      }
    });
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
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '300px',
      height: '300px',
      data: {boardId: this.boardId, columnId: this.columnId}
    });
    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }
}

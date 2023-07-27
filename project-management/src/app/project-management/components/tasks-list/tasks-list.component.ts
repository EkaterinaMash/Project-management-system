import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ColumnType} from "../../../shared/types/column-type.model";
import {TasksService} from "../../../shared/services/tasks.service";
import {TaskBody, TaskType} from "../../../shared/types/task-type.model";
import {GeneralState} from "../../../store/state.model";
import {select, Store} from "@ngrx/store";
import {clearTasks, getTasks} from "../../../store/actions/column.actions";
import {selectColumnTasks} from "../../../store/selectors/selectors";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {
  @Input() boardId: string;
  @Input() columnId: string;
  tasks: TaskType[] = [];
  currentColumnTasks: TaskType[] = [];
  dragged: boolean = false;
  serviceSubscription: Subscription;
  tasksBody: TaskBody[] = [];

  constructor(private tasksService: TasksService,
              private store: Store<GeneralState>) {
  }

  ngOnInit() {
    this.serviceSubscription = this.tasksService
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
        this.tasks = value
      });
    this.currentColumnTasks = this.tasks
      .filter(task => task.columnId === this.columnId)
      .sort((a, b) => a.order - b.order);
  }

  drop(event: CdkDragDrop<TaskType[]>) {
    moveItemInArray(this.currentColumnTasks, event.previousIndex, event.currentIndex);
    this.dragged = true;
  }

  ngOnDestroy() {
    if (this.serviceSubscription) {
      if (this.dragged && this.currentColumnTasks.length) {
        this.currentColumnTasks.forEach((task, index) => {
          const currentTask: TaskBody = {};
          currentTask._id = task._id;
          currentTask.order = index;
          currentTask.columnId = task.columnId;
          this.tasksBody.push(currentTask);
        });
        this.tasksService.updateTasksSet(this.tasksBody).subscribe();
      }
      this.store.dispatch(clearTasks());
      this.serviceSubscription.unsubscribe();
    }
  }
}

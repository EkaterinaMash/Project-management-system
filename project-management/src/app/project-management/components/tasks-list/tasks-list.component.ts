import {Component, Input, OnInit, Output} from '@angular/core';
import {ColumnType} from "../../../shared/types/column-type.model";
import {TasksService} from "../../../shared/services/tasks.service";
import {TaskType} from "../../../shared/types/task-type.model";
import {GeneralState} from "../../../store/state.model";
import {select, Store} from "@ngrx/store";
import {clearTasks, getTasks} from "../../../store/actions/column.actions";
import {selectColumnTasks} from "../../../store/selectors/selectors";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit{
  @Input() boardId: string
  @Input() columnId: string
  tasks: TaskType[] = [];
  currentColumnTasks: TaskType[] = [];

  constructor(private tasksService: TasksService,
              private store: Store<GeneralState>) {
  }

  ngOnInit() {
    this.store.dispatch(clearTasks());

    this.tasksService
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
    this.currentColumnTasks = this.tasks.filter(task => task.columnId === this.columnId);
  }
}

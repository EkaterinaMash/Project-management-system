import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TasksService} from "../../../../shared/services/tasks.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import {GeneralState} from "../../../../store/state.model";
import {selectColumnTasks} from "../../../../store/selectors/selectors";
import {TaskType} from "../../../../shared/types/task-type.model";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  createTaskForm!: FormGroup;

  tasks: TaskType[] | undefined;
  taskOrder: number;
  boardId: string;
  columnId: string;
  created: boolean = false;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private tasksService: TasksService,
              private store: Store<GeneralState>) {
  }

  ngOnInit() {
    this.generateTaskOrder();

    this.createTaskForm = this.fb.group({
      title: [''],
      description: [''],
      order: [this.taskOrder],
      userId: [1],
      users: [['users']]
    })
  }

  onSubmit() {
    this.boardId = this.data.boardId;
    this.columnId = this.data.columnId;

    if (this.createTaskForm?.valid) {
      this.tasksService.createTask(this.boardId, this.columnId, this.createTaskForm.value).subscribe();
      this.created = true;
    }
  }

  generateTaskOrder() {
    this.store.pipe(select(selectColumnTasks))
      .subscribe(value => this.tasks = value);
    if (!this.tasks) this.taskOrder = 0;
    if (this.tasks) this.taskOrder = this.tasks.length;
  }
}

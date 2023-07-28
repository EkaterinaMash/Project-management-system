import {Component, EventEmitter, Inject, OnInit, Optional, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TasksService} from "../../../../shared/services/tasks.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
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
  @Output() createTaskEvent = new EventEmitter<TaskType>;
  createTaskForm!: FormGroup;

  tasks: TaskType[] | undefined;
  currentColumnTasks: TaskType[] | undefined;
  taskOrder: number;
  boardId: string;
  columnId: string;
  created: boolean = false;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<CreateTaskComponent>,
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
     // this.currentColumnTasks.push(this.createTaskForm.value);
      this.tasksService.createTask(this.boardId, this.columnId, this.createTaskForm.value).subscribe();
      this.created = true;
      this.dialogRef.close({data: true});
    }
  }

  generateTaskOrder() {
    this.store.pipe(select(selectColumnTasks))
      .subscribe(value => this.tasks = value);
    this.currentColumnTasks = this.tasks
      .filter(task => task.columnId === this.columnId)
      .sort((a, b) => a.order - b.order);
    if (!this.currentColumnTasks) this.taskOrder = 0;
    if (this.currentColumnTasks) this.taskOrder = this.currentColumnTasks.length;
  }

  closeModal() {
    this.dialogRef.close({data:false});
  }
}

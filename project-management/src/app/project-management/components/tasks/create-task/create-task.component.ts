import {Component, EventEmitter, Inject, OnInit, Optional, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TasksService} from "../../../../shared/services/tasks.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import {GeneralState} from "../../../../store/state.model";
import {selectColumnTasks} from "../../../../store/selectors/selectors";
import {TaskType} from "../../../../shared/types/task-type.model";
import {addTask} from "../../../../store/actions/column.actions";

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

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<CreateTaskComponent>,
              private fb: FormBuilder,
              private tasksService: TasksService,
              private store: Store<GeneralState>) {
  }

  ngOnInit() {
    const user = localStorage.getItem('userLogin');
    this.boardId = this.data.boardId;
    this.columnId = this.data.columnId;
    this.generateTaskOrder();

    this.createTaskForm = this.fb.group({
      title: ['', [
        Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      description: ['', [
        Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      order: [this.taskOrder],
      userId: [user],
      users: [[user]]
    })
  }

  onSubmit() {
    if (this.createTaskForm?.valid) {
      this.tasksService
        .createTask(this.boardId, this.columnId, this.createTaskForm.value)
        .subscribe((data: TaskType) => {
          this.store.dispatch(addTask({newTask: data}));
        });
      this.dialogRef.close();
    }
  }

  generateTaskOrder() {
    this.store
      .pipe(select(selectColumnTasks))
      .subscribe(value => {
        this.currentColumnTasks = value
          .filter(task => task.columnId === this.columnId)
          .sort((a, b) => a.order - b.order);
        if (!this.currentColumnTasks) this.taskOrder = 0;
        if (this.currentColumnTasks) this.taskOrder = this.currentColumnTasks.length;
      });
  }
}

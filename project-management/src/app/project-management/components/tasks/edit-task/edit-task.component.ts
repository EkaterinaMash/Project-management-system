import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TasksService} from "../../../../shared/services/tasks.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  editTaskForm!: FormGroup;

  columnId: string;
  boardId: string;
  taskId: string;
  taskOrder: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<EditTaskComponent>,
              private fb: FormBuilder,
              private tasksService: TasksService) {
  }

  ngOnInit() {
    this.columnId = this.data.columnId;
    this.taskId = this.data.taskId;
    this.boardId = this.data.boardId;
    this.taskOrder = this.data.taskOrder;

    this.editTaskForm = this.fb.group({
      title: ['', [
        Validators.required, Validators.minLength(5), Validators.maxLength(20)
      ]],
      order: [this.taskOrder],
      description: ['', [
        Validators.required, Validators.minLength(10), Validators.maxLength(50)
      ]],
      columnId: [this.columnId],
      userId: [1],
      users: [['users']]
    })
  }

  onSubmit() {
    if (this.editTaskForm?.valid) {
      this.tasksService
        .editTask(this.boardId, this.columnId, this.taskId, this.editTaskForm.value).subscribe();
    }
    this.dialogRef.close({
      data: {
        title: this.editTaskForm.value.title,
        description: this.editTaskForm.value.description
      }
    });
  }
}

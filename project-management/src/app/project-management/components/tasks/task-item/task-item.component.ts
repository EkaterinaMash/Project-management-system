import {Component, Input} from '@angular/core';
import {TaskType} from "../../../../shared/types/task-type.model";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
@Input() task: TaskType | undefined;
@Input() columnId: string;
}

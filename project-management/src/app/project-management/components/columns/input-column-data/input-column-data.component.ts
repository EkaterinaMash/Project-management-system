import {Component} from '@angular/core';
import {MdbModalRef} from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-input-column-data',
  templateUrl: './input-column-data.component.html',
  styleUrls: ['./input-column-data.component.scss']
})
export class InputColumnDataComponent {
  constructor(public modalRef: MdbModalRef<InputColumnDataComponent>) {
  }
}

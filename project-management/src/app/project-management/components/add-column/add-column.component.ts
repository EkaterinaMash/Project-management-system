import {Component} from '@angular/core';

import {InputColumnDataComponent} from "../columns/input-column-data/input-column-data.component";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.scss'],
  providers: [MdbModalService]
})
export class AddColumnComponent {
  modalRef: MdbModalRef<InputColumnDataComponent> | null = null;

  constructor(private modalService: MdbModalService) {
  }

  openForm() {
    this.modalRef = this.modalService.open(InputColumnDataComponent);
  }
}

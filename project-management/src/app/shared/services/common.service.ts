import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../components/modal/modal.component";
import {ColumnService} from "./column.service";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public dialog: MatDialog) {}

  deleteModal(data, deleteConfirmation, deleteFunction) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      deleteConfirmation = result.data;
      if (deleteConfirmation) deleteFunction();
    })
  }
}

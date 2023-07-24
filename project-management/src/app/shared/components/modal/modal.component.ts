import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent<TData> {

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: any,
              private dialogRef: MatDialogRef<ModalComponent<TData>>) {}

  cancel() {
    this.dialogRef.close({data: false})
  }

  confirm() {
    this.dialogRef.close({data: true})
  }
}

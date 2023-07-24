import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ModalComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ModalComponent
  ]
})
export class SharedModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [
    ModalComponent,
    ErrorMessageComponent,
  ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule
    ],
  exports: [
    ModalComponent
  ]
})
export class SharedModule {
}

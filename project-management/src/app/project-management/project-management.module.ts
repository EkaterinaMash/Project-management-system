import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {BoardPageComponent} from "./pages/board-page/board-page.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";
import {CreateBoardComponent} from './components/boards/create-board/create-board.component';
import {MatCardModule} from "@angular/material/card";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {BoardsListComponent} from './components/boards/boards-list/boards-list.component';
import {ColumnItemComponent} from './components/columns/column-item/column-item.component';
import {ColumnsListComponent} from "./components/columns/columns-list/columns-list.component";
import {SignupComponent} from "./components/auth/signup/signup.component";
import { CreateColumnComponent } from './components/columns/create-column/create-column.component';
import { OpenBoardComponent } from './components/boards/open-board/open-board.component';
import { BoardComponent } from './components/boards/board/board.component';
import { LoginComponent } from './components/auth/login/login.component';
import {ModalComponent} from "./components/modals/modal/modal.component";
import {ErrorMessageComponent} from "./components/modals/error-message/error-message.component";
import { EditProfileComponent } from './components/auth/edit-profile/edit-profile.component';
import { CreateTaskComponent } from './components/tasks/create-task/create-task.component';
import { TaskItemComponent } from './components/tasks/task-item/task-item.component';
import {CdkDrag, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import {NgxTranslateModule} from "../shared/translate/translate.module";

@NgModule({
  declarations: [
    MainPageComponent,
    BoardPageComponent,
    CreateBoardComponent,
    BoardsListComponent,
    ColumnItemComponent,
    ColumnsListComponent,
    CreateColumnComponent,
    ModalComponent,
    ErrorMessageComponent,
    SignupComponent,
    OpenBoardComponent,
    BoardComponent,
    LoginComponent,
    EditProfileComponent,
    CreateTaskComponent,
    TaskItemComponent,
    EditTaskComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        AppRoutingModule,
        RouterModule,
        MatCardModule,
        MatDialogModule,
        CdkDropList,
        CdkDrag,
        CdkDropListGroup,
        NgxTranslateModule,
    ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
  ],
  exports: [
    RouterModule,
    MainPageComponent,
    BoardPageComponent
  ]
})
export class ProjectManagementModule {
}

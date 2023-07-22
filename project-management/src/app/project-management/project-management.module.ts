import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {BoardPageComponent} from "./pages/board-page/board-page.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule, Routes} from "@angular/router";
import {CreateBoardComponent} from './components/boards/create-board/create-board.component';
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {BoardsListComponent} from './components/boards/boards-list/boards-list.component';
import {ColumnItemComponent} from './components/columns/column-item/column-item.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateColumnComponent } from './components/columns/create-column/create-column.component';
import { OpenBoardComponent } from './components/boards/open-board/open-board.component';
import { BoardComponent } from './components/boards/board/board.component';
import { ColumnsPageComponent } from './pages/columns-page/columns-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    BoardPageComponent,
    CreateBoardComponent,
    BoardsListComponent,
    ColumnItemComponent,
    SignupComponent,
    CreateColumnComponent,
    OpenBoardComponent,
    BoardComponent,
    ColumnsPageComponent,
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
    //StoreModule.forFeature('boards123', boardsReduceraaaa),
    // StoreModule.forFeature('boardsList', boardsListReducer)
  ],
  exports: [
    RouterModule,
    MainPageComponent,
    BoardPageComponent
  ]
})
export class ProjectManagementModule {
}

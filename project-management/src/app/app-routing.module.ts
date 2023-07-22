import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./project-management/pages/main-page/main-page.component";
import {BoardPageComponent} from "./project-management/pages/board-page/board-page.component";
import {SignupComponent} from "./project-management/components/signup/signup.component";
import {BoardComponent} from "./project-management/components/boards/board/board.component";
import {CreateColumnComponent} from "./project-management/components/columns/create-column/create-column.component";
import {ColumnsPageComponent} from "./project-management/pages/columns-page/columns-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainPageComponent},
  {path: 'board', component: BoardPageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'boardItem', component: BoardComponent},
  {path: 'createColumn', component: CreateColumnComponent},
  {path: 'columns', component: ColumnsPageComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

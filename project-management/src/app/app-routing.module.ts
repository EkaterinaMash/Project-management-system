import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./project-management/pages/main-page/main-page.component";
import {BoardPageComponent} from "./project-management/pages/board-page/board-page.component";
import {SignupComponent} from "./project-management/components/signup/signup.component";
import {BoardComponent} from "./project-management/components/boards/board/board.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainPageComponent},
  {path: 'board', component: BoardPageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'boardItem', component: BoardComponent}
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

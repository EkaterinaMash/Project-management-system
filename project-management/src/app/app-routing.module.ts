import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./project-management/pages/main-page/main-page.component";
import {BoardPageComponent} from "./project-management/pages/board-page/board-page.component";
import {SignupComponent} from "./project-management/components/signup/signup.component";
import {BoardComponent} from "./project-management/components/boards/board/board.component";
import {CreateColumnComponent} from "./project-management/components/columns/create-column/create-column.component";
import {LoginComponent} from "./project-management/components/auth/login/login.component";
import {EditProfileComponent} from "./project-management/components/auth/edit-profile/edit-profile.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainPageComponent},
  {path: 'boards', component: BoardPageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'boardItem/:id', component: BoardComponent},
  {path: 'createColumn', component: CreateColumnComponent},
  {path: 'editProfile', component: EditProfileComponent }
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

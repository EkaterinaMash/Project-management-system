import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {GeneralState} from "../../../../store/state.model";
import {Store} from "@ngrx/store";
import {getUsers} from "../../../../store/actions/users.actions";
import {UserType} from "../../../../shared/types/user-type.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  users: UserType[] = []

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<GeneralState>
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        login: [''],
        password: ['']
      }
    )
  }

  logIn() {
    this.authService.login(this.loginForm.value);
   // this.authService.getUsers().subscribe(users => {this.users = users});
    this.router.navigate(['board']);

  }

}

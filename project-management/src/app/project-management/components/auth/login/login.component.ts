import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {GeneralState} from "../../../../store/state.model";
import {Store} from "@ngrx/store";
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
        login: ['',
          [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        password: ['',
          [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
      }
    )
  }

  logIn() {
    this.authService.login(this.loginForm.value);
    this.router.navigate(['boards']);
  }
}

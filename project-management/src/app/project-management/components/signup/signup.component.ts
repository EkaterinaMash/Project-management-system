import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {select} from "@ngrx/store";
import {AuthState, RegisterForm} from "../../../store/auth-state.model";
import {selectAuthError, selectAuthState} from "../../../store/selectors/auth-selectors";
import {register, registerSuccess} from "../../../store/actions/auth.actions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {group} from "@angular/animations";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  errorMessage: Observable<string | null>;
  createAuthForm!: FormGroup

  constructor(private readonly store: Store<AuthState>,
              private fb: FormBuilder) {
    this.errorMessage = this.store.pipe(select(selectAuthError));
  }

  ngOnInit(): void {

    this.createAuthForm =this.fb.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: [[], [Validators.required]],
    })
  }

  onSubmit(): void {
    if (this.createAuthForm?.valid) {
      console.log('signup');
      this.store.dispatch(register({ data: this.createAuthForm.value }));
    }
  }
}

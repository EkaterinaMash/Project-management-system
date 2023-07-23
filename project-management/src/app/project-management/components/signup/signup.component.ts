import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {GeneralState} from "../../../store/state.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage: Observable<string | null>;
  createAuthForm!: FormGroup

  constructor(private readonly store: Store<GeneralState>,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.createAuthForm = this.fb.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: [[], [Validators.required]],
    })
  }

  onSubmit(): void {
    if (this.createAuthForm?.valid) {
      this.authService
        .register(this.createAuthForm.value)
        .subscribe((response) => {
          if (response) {
            this.createAuthForm.reset();
            this.router.navigate(['login']);
          }
        })
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {GeneralState} from "../../../../store/state.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage: Observable<string | null>;
  authForm!: FormGroup

  constructor(private readonly store: Store<GeneralState>,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      name: ['',
        [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      login: ['',
        [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      password: ['',
        [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
    })
  }

  onSubmit(): void {
    if (this.authForm?.valid) {
      this.authService
        .register(this.authForm.value)
        .subscribe((response) => {
          if (response) {
            this.authForm.reset();
            this.router.navigate(['login']);
          }
        });
    }
  }

}

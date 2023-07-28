import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AuthState} from "../../store/auth-state.model";
import {catchError, EMPTY, map, Observable, of, throwError} from "rxjs";
import {UserType} from "../types/user-type.model";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";
import {MatDialog} from "@angular/material/dialog";
import {ErrorInterceptor} from "../interseptors/error.interceptor";
import {ErrorMessageComponent} from "../components/error-message/error-message.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${environment.backend}/auth`;
  usersUrl = `${environment.backend}/users`
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };
  currentUser = {};
  decodedToken;
  tokenExpireTime;

  constructor(private http: HttpClient,
              private store: Store<AuthState>,
              private router: Router,
              private dialog: MatDialog) {
  }

  login(user: UserType) {
    return this.http
      .post<any>(`${this.url}/signin`, user)
      .pipe(catchError(error => this.handleError(error)))
      .subscribe(res => {
        this.decodedToken = jwtDecode(res.token);
        this.tokenExpireTime = this.decodedToken.exp;
        localStorage.setItem('token', res.token);
        localStorage.setItem('expireTime', this.tokenExpireTime);
        localStorage.setItem('userLogin', user.login);

        setTimeout(() => {
          this.logout();
        }, this.tokenExpireTime);
      })

  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expireTime');
    localStorage.removeItem('userLogin');
    this.router.navigate(['main']);
  }

  register(user: UserType): Observable<any> {
    return this.http.post(this.url + '/signup', user)
      .pipe(
        catchError(error => this.handleError(error)));
  }

  get isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    return token !== null;
  }

  getUsers(): Observable<any> {
    return this.http.get(this.usersUrl);
  }

  getToken(): Observable<string | null> {
    return of(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null);
  }


  handleError(error) {
    let errorMessage = '';
    console.log(error);
    if (error.error.statusCode === 401) {
      errorMessage = `Error: ${error.error.message}!\nInvalid authentification credentials for the target resourse.`
    } else if (error.error.statusCode === 409) {
      errorMessage = `Error: ${error.error.message}!\nPlease create another login.`
    } else {
      errorMessage = `Error: ${error.error.message}`
    }
     this.dialog.open(ErrorMessageComponent, {
       data: {message: errorMessage}
     })

    return EMPTY;
  }
}

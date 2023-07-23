import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Store} from "@ngrx/store";
import { AuthState} from "../../store/auth-state.model";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {UserType} from "../types/user-type.model";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";

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
              private router: Router) {
  }

  login(user: UserType) {
    return this.http
      .post<any>(`${this.url}/signin`, user)
      .subscribe(res => {
        this.decodedToken = jwtDecode(res.token);
        this.tokenExpireTime = this.decodedToken.exp;
        localStorage.setItem('token', res.token);
        localStorage.setItem('expireTime', this.tokenExpireTime);

        setTimeout(() => {
          this.logout();
          this.router.navigate(['main']);
        }, this.tokenExpireTime);
      })
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  register(user: UserType): Observable<any> {
    return this.http.post(this.url + '/signup', user);
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

  getUserProfile(id: string): Observable<any> {
    let userUrl = `${environment.backend}/users/${id}`;
    return this.http.get(userUrl, this.httpOptions)
      .pipe(map(response => {
          return response || {}
        }),
      )
  }

  handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message
    } else {
      message = `Error: ${error.status}\n Message: ${error.message}`;
    }
    return () => new Error(message);
  }
}

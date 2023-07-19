import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AuthenticationData, AuthState} from "../../store/auth-state.model";
import {AuthorizationData} from "../../store/auth-state.model";
import {Observable, of} from "rxjs";
import {selectLoginStatus} from "../../store/selectors/auth-selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${environment.backend}/auth`;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient,
              private store: Store<AuthState>) {
  }

  login(loginData: AuthenticationData): Observable<any> {
    return this.http.post(this.url + 'signin', loginData, this.httpOptions)
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
  }

  register(registerData: AuthorizationData): Observable<any> {
    return this.http.post(this.url + 'signup', registerData, this.httpOptions);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(selectLoginStatus);
  }

  getToken(): Observable<string | null> {
    return of(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null);
  }

  setToken(token: string, id: string): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', id);
  }
}

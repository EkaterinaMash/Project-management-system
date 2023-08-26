import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserType} from "../types/user-type.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = `${environment.backend}/users`;
  headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    const headers = this.headers;
    return this.http.get(this.url, {headers});
  }

  updateUser(userId: string, body: UserType): Observable<any> {
    const headers = this.headers;
    return this.http.put<any>(`${this.url}/${userId}`, body, {headers});
  }

  deleteUser(userId: string): Observable<any> {
    const headers = this.headers;
    return this.http.delete(`${this.url}/${userId}`, {headers});
  }
}

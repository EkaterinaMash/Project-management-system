import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserType} from "../types/user-type.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = `${environment.backend}/users`

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  updateUser(userId: string, body: UserType): Observable<any> {
    return this.http.put<any>(`${this.url}/${userId}`, body)
  }
}

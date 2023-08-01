import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {BoardType} from "../types/board-type.model";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  url = `${environment.backend}/boards`;
  headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient) {
  }

  createBoard(body: BoardType): Observable<any> {
    const headers = this.headers;
    return this.http.post(this.url, body, {headers});
  }

  getBoards(): Observable<any> {
    const headers = this.headers;
    return this.http.get(this.url, {headers});
  }

  getBoard(boardId: string): Observable<any> {
    const headers = this.headers;
    return this.http.get(`${this.url}/${boardId}`, {headers});
  }

  deleteBoard(boardId: string): Observable<any> {
    const headers = this.headers;
    return this.http.delete(`${this.url}/${boardId}`, {headers});
  }
}


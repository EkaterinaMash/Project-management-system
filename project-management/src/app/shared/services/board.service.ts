import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {BoardType} from "../types/board-type.model";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  url = `${environment.backend}/boards`

  constructor(private http: HttpClient) {
  }

  createBoard(body: BoardType): Observable<any> {
    return this.http.post(this.url, body)
  }

  getBoards(): Observable<any> {
    return this.http.get(this.url);
  }

  getBoard(boardId: string): Observable<any> {
    return this.http.get(`${this.url}/${boardId}`)
  }
}


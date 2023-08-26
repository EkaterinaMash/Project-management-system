import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ColumnType} from "../types/column-type.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  url = `${environment.backend}/boards`;
  setUrl = `${environment.backend}/columnsSet`;
  headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient) {
  }

  getColumns(boardId: string): Observable<ColumnType[]> {
    const headers = this.headers;
    return this.http.get<ColumnType[]>(`${this.url}/${boardId}/columns`, {headers});
  }

  createColumn(boardId: string, body: ColumnType): Observable<ColumnType> {
    const headers = this.headers;
    return this.http.post<ColumnType>(`${this.url}/${boardId}/columns`, body, {headers});
  }

  deleteColumn(boardId: string, columnId: string) {
    const headers = this.headers;
    return this.http.delete(`${this.url}/${boardId}/columns/${columnId}`, {headers});
  }

  updateColumnsSet(body: ColumnType[]) {
    const headers = this.headers;
    return this.http.patch(this.setUrl, body, {headers});
  }

  updateColumn(boardId: string, columnId: string, body: ColumnType) {
    const headers = this.headers;
    return this.http.put(`${this.url}/${boardId}/columns/${columnId}`, body, {headers});
  }
}

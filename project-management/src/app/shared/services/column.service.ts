import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ColumnType} from "../types/column-type.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  url = `${environment.backend}/boards`;
  setUrl = `${environment.backend}/columnsSet`

  constructor(private http: HttpClient) {
  }

  getColumns(boardId: string): Observable<ColumnType[]> {
    return this.http.get<ColumnType[]>(`${this.url}/${boardId}/columns`);
  }

  createColumn(boardId: string, body: ColumnType): Observable<ColumnType> {
    return this.http.post<ColumnType>(`${this.url}/${boardId}/columns`, body);
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete(`${this.url}/${boardId}/columns/${columnId}`);
  }

  updateColumnsSet(body: ColumnType) {
    return this.http.patch(this.setUrl, body);
  }

  updateColumn(boardId: string, columnId: string, body: ColumnType) {
    return this.http.put(`${this.url}/${boardId}/columns/${columnId}`, body);
  }
}

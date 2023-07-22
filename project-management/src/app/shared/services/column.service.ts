import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ColumnType} from "../types/column-type.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  url = `${environment.backend}/boards`;

  constructor(private http: HttpClient) { }

  generateUrl(boardId: string): string {
    return `${this.url}/${boardId}`;
  }

  getColumns(boardId: string): Observable<ColumnType[]> {
    return this.http.get<ColumnType[]>(`${this.generateUrl(boardId)}/columns`);
  }

  createColumn(boardId: string, body: ColumnType): Observable<ColumnType> {
    console.log('service works');
    return this.http.post<ColumnType>(`${this.generateUrl(boardId)}/columns`, body);
  }
}

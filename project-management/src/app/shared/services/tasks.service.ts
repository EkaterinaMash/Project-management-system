import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TaskType} from "../types/task-type.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = `${environment.backend}/boards`;

  constructor(private http: HttpClient) { }

  generateTasksUrl(boardId: string, columnId: string) {
    return `${this.url}/${boardId}/columns/${columnId}/tasks`
  }

  createTask(boardId: string, columnId: string, body: TaskType): Observable<any> {
    return this.http.post<any>(`${this.generateTasksUrl(boardId, columnId)}`, body)
  }

  getTasks(boardId: string, columnId: string): Observable<any> {
    return this.http.get(`${this.generateTasksUrl(boardId, columnId)}`)
  }
}

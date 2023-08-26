import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TaskBody, TaskType} from "../types/task-type.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = `${environment.backend}/boards`;
  setUrl = `${environment.backend}/tasksSet`;
  headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient) { }

  generateTasksUrl(boardId: string, columnId: string) {
    return `${this.url}/${boardId}/columns/${columnId}/tasks`
  }

  createTask(boardId: string, columnId: string, body: TaskType): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(`${this.generateTasksUrl(boardId, columnId)}`, body, {headers})
  }

  getTasks(boardId: string, columnId: string): Observable<any> {
    const headers = this.headers;
    return this.http.get(`${this.generateTasksUrl(boardId, columnId)}`, {headers})
  }

  updateTasksSet(body: TaskBody[]) {
    const headers = this.headers;
    return this.http.patch(this.setUrl, body, {headers});
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    const headers = this.headers;
    return this.http.delete(`${this.generateTasksUrl(boardId, columnId)}/${taskId}`, {headers})
  }

  editTask(boardId: string, columnId: string, taskId: string, body: TaskType) {
    const headers = this.headers;
    return this.http.put(`${this.generateTasksUrl(boardId, columnId)}/${taskId}`, body, {headers})
  }
}

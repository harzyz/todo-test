import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';
  private todos: any[] = [];

  constructor(private http: HttpClient) { }

  getStateTodos(): any[] {
    return this.todos;
  }

  setTodos(todo: any): void {
    this.todos.push(todo);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTodo(updatedTodo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${updatedTodo.id}`, updatedTodo);
  }
}

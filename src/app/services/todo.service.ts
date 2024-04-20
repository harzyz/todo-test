import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer } from 'rxjs';
// import { Todo } from './todo.model';
import { switchMap } from 'rxjs/operators';
import { Todo } from '../todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';
  // private todos: Todo[] = [];

  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getTodos().subscribe(todos => {
      this.todosSubject.next(todos);
    });
  }

  private updateTodos(todos: Todo[]): void {
    this.todosSubject.next(todos);
  }

  // getStateTodos(): Todo[] {
  //   return this.todos;
  // }


  getTodos(): Observable<any> {
    return timer(0, 5000).pipe(
      switchMap(() => this.http.get(this.apiUrl))
    );
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

  addTodoToLocalState(todo: Todo): void {
    const currentTodos = this.todosSubject.getValue();
    const updatedTodos = [...currentTodos, todo];
    this.updateTodos(updatedTodos);
  }

  deleteTodoFromLocalState(id: number): void {
    const currentTodos = this.todosSubject.getValue();
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this.updateTodos(updatedTodos);
  }

  editTodoLocalState(updatedTodo: Todo): void {
    const currentTodos = this.todosSubject.getValue();
    const updatedTodos = currentTodos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    this.updateTodos(updatedTodos);
  }
}

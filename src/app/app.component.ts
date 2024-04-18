import { Component } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  // deleteTodo(id: number): void {
  //   this.todos = this.todos.filter(todo => todo.id !== id);
  // }

  deleteTodo(event: Event): void {
    const id = (event.target as HTMLElement).id;
    this.todos = this.todos.filter(todo => todo.id !== +id);
  }
}

import { Component } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent {
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

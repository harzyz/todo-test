import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
    console.log(this.todos, 'jjjj')
  }

  addTodo(todo: Todo): void {
    this.todoService.addTodo(todo).subscribe(newTodo => {
      this.todos.push(newTodo);
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }

  updateTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.todos = this.todos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
    });
  }
}

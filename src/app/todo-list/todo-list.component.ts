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
    this.todoService.getTodos().subscribe(todo => {
      this.todos = todo;
      console.log(this.todos, 'jjjj')
    });
  }

  addTodo(todo: Todo): void {
    this.todoService.addTodo(todo).subscribe(newTodo => {
      this.todos.push(newTodo);
    });
  }

  done(i : number) {
    this.todos[i].completed
  }

  // deleteTodo(todo: Todo) {
  //   console.log(todo)
  //   console.log(this.todos)
  //   this.todoService.deleteTodo(todo).subscribe(() => {
  //     // this.todos.slice(id, 1)
  //   });
  //   this.ngOnInit()
  // }

  updateTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.todos = this.todos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
    });
  }
}

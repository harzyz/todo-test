import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[]= [];
  selectedTodo: any | null = null;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    });
    this.gettodos()
  }

  gettodos() {
    this.todoService.getTodos().subscribe((todo) => {
      this.todos = todo;
    });
  }

  done(i: number) {
    const updatedTodo = { ...this.todos[i], completed: true };
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.todoService.editTodoLocalState(updatedTodo);
      this.todos = this.todos.map((todo, index) =>
        index === i ? updatedTodo : todo
      );
    });
  }

  deleteTodo(id: number, i: number) {
    if(window.confirm('Are you sure you want to DELETE Todo?')){
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todoService.deleteTodoFromLocalState(id);
        this.todos = this.todos.filter(todo => todo.id !== id);
        alert('Todo deleted');
      });
    }
  }

  updateTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.todoService.editTodoLocalState(updatedTodo);
      this.todos = this.todos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      this.selectedTodo = null;
    });
  }

  editTodo(todo: Todo): void {
    this.selectedTodo = { ...todo };
  }
}

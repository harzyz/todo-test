import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '' 

  
  constructor(private todoService: TodoService) {

  }

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

  saveTodo() {
    if (this.newTodo) {
      const todo: any = {
        title: this.newTodo,
        completed: false,
      };
      this.todoService.addTodoToLocalState(todo);
      this.todoService.addTodo(todo).subscribe((newTodo) => {
      });
      this.newTodo = '';
    } else {
      alert('Please Enter Todo');
    }
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

 
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  newTodo: string = '' 

  
  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
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

 
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todos: Todo[] = [];
  // todoForm: FormGroup;
  newTodo: string = '' 

  // constructor(private fb: FormBuilder, private todoService: TodoService) {
  //   this.todoForm = this.fb.group({
  //     title: ['', Validators.required]
  //   });
  // }
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
      this.todoService.addTodo(todo).subscribe((newTodo) => {
        this.todos.push(newTodo);
      });
      this.newTodo = '';
    } else {
      alert('Please Enter Todo');
    }
  }

 
}

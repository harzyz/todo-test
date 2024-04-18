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
  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const todo: Todo = {
        id: Date.now(),
        title: this.todoForm.value.title,
        completed: false
      };
      this.todoService.addTodo(todo).subscribe(newTodo => {
      });
      this.todoForm.reset();
    }
  }
}

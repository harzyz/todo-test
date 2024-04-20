import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../../todo.model';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';
  deleteModalOpen: boolean = false;

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.todoService.todos$.subscribe((todos) => {
      this.todos = todos;
    });
    this.gettodos();
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
      this.todoService.addTodo(todo).subscribe((newTodo) => {});
      this.newTodo = '';
    } else {
      this.toastr.warning('Please Enter Todo');
    }
  }

  deleteTodo(id: number, i: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todoService.deleteTodoFromLocalState(id);
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.toastr.success('Todo deleted');
    });
    this.deleteModalOpen = false;
  }

  deleteConfirm() {
    this.deleteModalOpen = true;
  }

  deleteModalToggle(open: boolean) {
    this.deleteModalOpen = open;
  }

  cancel() {
    this.deleteModalOpen = false;
  }
}

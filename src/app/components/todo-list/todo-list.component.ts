import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../todo.model';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  selectedTodo: any | null = null;
  deleteModalOpen: boolean = false;
  editModalOpen: boolean = false;
  deleteId: number | null = null;

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.todoService.todos$.subscribe((todos) => {
      this.todos = todos;
    });
    
    // this.gettodos();
  }

  gettodos() {
    this.todoService.getTodos().subscribe((todo) => {
      this.todos = todo;
    });
  }

  done(i: number) {
    const updatedTodo = { ...this.todos[i], completed: true };
    this.todoService.editTodoLocalState(updatedTodo);
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.todos = this.todos.map((todo, index) =>
        index === i ? updatedTodo : todo
      );
    });
    this.toastr.success('Completed!');
  }

  deleteTodo() {
    if (this.deleteId !== null) {
      this.todoService.deleteTodoFromLocalState(this.deleteId);
      this.todoService.deleteTodo(this.deleteId).subscribe(() => {
        this.todos = this.todos.filter((todo) => todo.id !== this.deleteId);
        this.toastr.success('Todo deleted');
      });
      this.deleteModalOpen = false;
      this.deleteId = null;
    }
  }

  deleteConfirm(id: number) {
    this.deleteModalOpen = true;
    this.deleteId = id;
  }

  deleteModalToggle(open: boolean) {
    this.deleteModalOpen = open;
  }
  editConfirm() {
    this.editModalOpen = true;
  }

  editModalToggle(open: boolean) {
    this.editModalOpen = open;
  }

  cancel() {
    this.deleteModalOpen = false;
  }

  updateTodo(updatedTodo: Todo): void {
    this.todoService.editTodoLocalState(updatedTodo);
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.todos = this.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      this.selectedTodo = null;
      this.editModalOpen = false;
      this.toastr.success('Todo Saved');
    });
  }

  editTodo(todo: Todo): void {
    this.selectedTodo = { ...todo };
    this.editConfirm();
  }
}

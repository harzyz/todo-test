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
  deleteId: number | null = null;

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
      this.todoService.addTodo(todo).subscribe();
      this.newTodo = '';
    } else {
      this.toastr.warning('Please Enter Todo');
    }
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

  cancel() {
    this.deleteModalOpen = false;
  }
  
  noCompletedTodos(): boolean {
    return this.todos.filter(todo => todo.completed).length === 0;
  }
}

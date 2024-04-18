import { Component } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css'],
})
export class DasboardComponent {
  todos: any[] = [];
  newTodo: string = '';
  selectedTodo: any | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.gettodos();
  }

  saveTodo() {
    if (this.newTodo) {
      const todo: any = {
        title: this.newTodo,
        completed: false,
      };
      this.todoService.addTodo(todo).subscribe((newTodo) => {
        this.todos.push(newTodo)
      });
      this.newTodo = '';
    } else {
      alert('Please Enter Todo');
    }
  }

  done(i: number) {
    const updatedTodo = { ...this.todos[i], completed: true };
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.todos = this.todos.map((todo, index) =>
        index === i ? updatedTodo : todo
      );
    });
  }

  gettodos() {
    this.todoService.getTodos().subscribe((todo) => {
      this.todos = todo;
      console.log(this.todos, 'jjjj');
    });
  }

  deleteTodo(id: number, i: number) {
    if(window.confirm('Are you sure you want to DELETE Todo?')){
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todos.splice(i, 1);
      });
      alert('Todo deleted')
    }
  }

  updateTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.todos = this.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      this.selectedTodo = null;
    });
    alert('Todo Saved')
  }
  editTodo(todo: Todo): void {
    this.selectedTodo = { ...todo };
  }
}

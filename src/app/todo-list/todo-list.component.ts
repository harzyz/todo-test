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
  selectedTodo: any | null = null;

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

  deleteTodo(id: number, i: number) {
    console.log(id)
    console.log(this.todos)
    this.todoService.deleteTodo(id).subscribe(() => {
      if(this.todos.length === 1){
        this.todos.splice(i, 1)

      }else{
        this.todos.slice(i, 1)
      }
    });
  }

  updateTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
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

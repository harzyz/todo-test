import { Component } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent {
  todos: any[] = [];
  newTodo: string = '' 
  nextId: number = 1;
  selectedTodo: any | null = null;


  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.gettodos()
  }


  saveTodo() {
    if(this.newTodo){
      const todo: any = {
        title: this.newTodo,
        completed: false
      };
      this.todoService.addTodo(todo).subscribe(newTodo => {
        this.todos.push(newTodo);
      });
      this.newTodo = '';
      this.nextId++; // Increment the nextId for the next todo
    } else {
      alert('Please Enter Todo');
    }
  }
  

  done(i : number) {
    this.todos[i].completed = true
  }

  gettodos(){
    this.todoService.getTodos().subscribe(todo => {
      this.todos = todo;
      console.log(this.todos, 'jjjj')
    });
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
    // this.ngOnInit()
  }

  updateTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.todos = this.todos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      // Set the selectedTodo to null after updating
      this.selectedTodo = null;
    });
  }
  
  // Add a new method to set the selectedTodo when the "Edit" button is clicked
  editTodo(todo: Todo): void {
    this.selectedTodo = { ...todo }; // Create a copy of the todo to avoid modifying the original
  }


}

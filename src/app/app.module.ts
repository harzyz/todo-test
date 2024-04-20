import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component'
import { ModalComponent } from './modal/modal.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent,
    LoginComponent,
    SignupComponent,
    AuthComponent,
    DasboardComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

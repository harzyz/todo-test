import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  paswordVisible: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  login() {
    this.http.get<any>('http://localhost:3000/users').subscribe(
      (res) => {
        const user = res.find((result: any) => {
          return (
            result.email === this.loginForm.value.email &&
            result.password === this.loginForm.value.password
          );
        });
        const token = Math.floor(Math.random() * 1000);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(token));
          this.toastr.success('Login success!!');
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        } else {
          this.toastr.error('Incorrect Email or Password!!');
        }
      },
      (err) => {
        this.toastr.warning('something went wrong!!');
      }
    );
  }
  passwordVisible(visible: boolean) {
    this.paswordVisible = visible;
  }
}

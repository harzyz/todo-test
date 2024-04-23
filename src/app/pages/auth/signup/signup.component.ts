import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { User } from './signup';
// import { JsonTableService } from '../json-table/services/json-table.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  paswordVisible: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      password: [''],
      mobile: [''],
    });
  }

  passwordVisible(visible: boolean) {
    this.paswordVisible = visible;
  }

  signUp() {
    console.log('this.signupForm.value', this.signupForm.value);
    this.http
      .post<any>('http://localhost:3000/users', this.signupForm.value)
      .subscribe(
        (res) => {
          debugger;
          this.toastr.success('Signup successfully');
          this.signupForm.reset();
          this.router.navigate(['login']);
          console.log(this.signupForm.errors);
        },
        (err) => {
          this.toastr.error('something went wrong');
        }
      );
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css'],
})
export class DasboardComponent {
  userName = ''

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.userName = user.fullname
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  
}

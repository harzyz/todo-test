import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css'],
})
export class DasboardComponent {
  userName = ''
  logoutModalOpen: boolean = false;


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

  logoutConfirm() {
    this.logoutModalOpen = true;
  }

  logoutModalToggle(open: boolean) {
    this.logoutModalOpen = open;
  }
  
  cancel() {
    this.logoutModalOpen = false;
  }
}

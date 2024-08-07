import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private router: Router) {}

  onLogin(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      this.router.navigate(['/page5']);
    } else {
      console.error('Login error');
    }
  }
}

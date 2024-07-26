import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'; // Import yolu kontrol edin
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  loginClick(username: string, password: string) {
    const user: User = {
      username: username,
      password: password
    };

    this.loginService.login(user).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        this.router.navigate(['/page1']);
      },
      (error: HttpErrorResponse) => {
        console.error('Login error:', error);
        this.message = 'Login failed. Please check your credentials.';
      }
    );
  }
}
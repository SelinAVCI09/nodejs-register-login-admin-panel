import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(username: string, password: string): void {
    this.authService.login({ username, password }).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.authService.setToken(response.token);
          const userId = response.id; // id'yi yanıtın içinden alın
          if (userId) {
            sessionStorage.setItem('userId', userId); // User ID'yi sessionStorage'a kaydedin
            this.router.navigate(['/page1']);
          } else {
            console.error('User ID is missing in response');
            this.message = 'Kullanıcı ID alınamadı'; 
          }
        } else {
          this.message = 'Giriş başarısız'; 
        }
      },
      error: (error) => {
        console.error('Login error', error);
        this.message = 'Giriş sırasında bir hata oluştu';
      }
    });
  }

  loginClick(username: string, password: string): void {
    this.login(username, password);
  }
}

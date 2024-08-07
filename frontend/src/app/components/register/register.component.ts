import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  message: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  register(username: string, email: string, password: string) {
    this.http.post('http://localhost:4002/api/register', { username, email, password })
      .subscribe(response => {
        this.message = 'Registration successful!';
        this.router.navigate(['/login']); // Başarıyla kayıt olduktan sonra login sayfasına yönlendir
      }, error => {
        this.message = error.error.message;
      });
  }
}
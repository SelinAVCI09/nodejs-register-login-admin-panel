import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service'; // LoginService'yi içe aktar
import { User } from '../../models/user.model'; // User modelini içe aktar

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string = '';

  constructor(private loginService: LoginService) { }

  loginClick(username: HTMLInputElement, password: HTMLInputElement): void {
    const user: User = {
      username: username.value,
      email: '', // Email alana boş bırakılabilir veya isteğe bağlı olarak eklenebilir
      password: password.value
    };

    this.loginService.login(user).subscribe(
      response => {
        this.message = 'Login successful!';
        // Burada başarılı giriş sonrası yapılacak işlemler olabilir (örneğin, token'ı saklama)
      },
      error => {
        this.message = 'Error logging in';
      }
    );
  }
}

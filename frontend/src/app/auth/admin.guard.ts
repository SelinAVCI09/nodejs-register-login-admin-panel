import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = this.authService.decodeToken(token);

      if (decodedToken && decodedToken.username === 'admin') {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token) {
      // Token varsa, route'a izin ver
      return true;
    } else {
      // Token yoksa, login sayfasına yönlendir
      this.router.navigate(['/login']);
      return false;
    }
  }
}

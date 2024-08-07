import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component {
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private authService: AuthService // AuthService'i inject et
  ) {
    this.checkToken(); // Sayfa yüklendiğinde token'ı kontrol et
  }

  checkToken(): void {
    if (!this.authService.isTokenValid()) {
      this.router.navigate(['/login']); // Token geçersizse login sayfasına yönlendir
    }
  }

  navigateToPage(page: string, buttonName: string): void {
    this.navigationService.recordButtonClick(buttonName);
    this.router.navigate([`/${page}`]);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']); // Login sayfasına yönlendir
      },
      error: (error: any) => {
        console.error('Logout error:', error);
      }
    });
  }

  goToUpdates(): void {
    this.router.navigate(['/navigation']);
  }
}

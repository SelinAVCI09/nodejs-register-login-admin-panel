import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-page4',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.css']
})
export class Page4Component {

  constructor(private router: Router, private navigationService: NavigationService) { }

  navigateToPage(page: string, buttonName: string): void {
    this.navigationService.recordButtonClick(buttonName);
    this.router.navigate([`/${page}`]);
  }
  recordButtonClick(buttonId: string) {
    this.navigationService.recordButtonClick(buttonId);
  }

  logout(): void {
    console.log('User logged out');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/login']);
  } goToUpdates(): void {
    this.router.navigate(['/navigation']);
  }
}


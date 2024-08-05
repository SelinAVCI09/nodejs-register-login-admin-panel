import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component {

  constructor(private router: Router, private navigationService: NavigationService) { }

  navigateToPage(page: string, buttonName: string): void {
    this.navigationService.recordButtonClick(buttonName);
    this.router.navigate([`/${page}`]);
  }

  logout(): void {
    console.log('User logged out');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
  goToUpdates(): void {
    this.router.navigate(['/navigation']);
  }
}

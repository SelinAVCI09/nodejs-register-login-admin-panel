import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component {
  private apiUrl = 'http://localhost:4002/api/button-stats/record-button-click';

  constructor(private router: Router, private http: HttpClient) { }

  navigateToPage(page: string, buttonName: string) {
    this.recordButtonClick(buttonName);
    this.router.navigate([`/${page}`]);
  }
  logout() {
    console.log('User logged out');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  private recordButtonClick(buttonName: string) {
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
      console.error('No User ID found');
      return;
    }
    const userIdNumber = Number(userId);

    this.http.post(this.apiUrl, { userId, buttonName })
      .subscribe(response => {
        console.log('Button click recorded', response);
      }, error => {
        console.error('Error recording button click', error);
      });
  }
}

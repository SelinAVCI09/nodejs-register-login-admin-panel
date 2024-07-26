import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component {
  private apiUrl = 'http://localhost:4002/api/button-stats/record-button-click';

  constructor(private router: Router, private http: HttpClient) { }

  navigateToPage(page: string, buttonName: string) {
    // Buton tıklama bilgisini API'ye gönder
    this.recordButtonClick(buttonName);
    this.router.navigate([`/${page}`]);
  }

  logout() {
    // Oturum kapatma işlemleri burada yapılır.
    console.log('User logged out');
    this.router.navigate(['/login']);
  }

  private recordButtonClick(buttonName: string) {
    // Kullanıcı ID'si ve buton ismini API'ye gönder
    const userId = 'exampleUserId'; // Bu değeri dinamik olarak ayarlayın
    this.http.post(this.apiUrl, { userId, buttonName })
      .subscribe(response => {
        console.log('Button click recorded', response);
      }, error => {
        console.error('Error recording button click', error);
      });
  }
}

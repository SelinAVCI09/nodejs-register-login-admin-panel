import { Component, OnInit } from '@angular/core';
import { ButtonClickService } from '../../services/button-click.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page5',
  templateUrl: './page5.component.html',
  styleUrls: ['./page5.component.css']
})
export class Page5Component implements OnInit {
  buttonClicks: any[] = [];
  message: string = '';
  userId: string = ''; // Kullanıcı ID'si için değişken

  constructor(private buttonClickService: ButtonClickService, private router: Router) {}

  ngOnInit(): void {
    // Sayfa yüklendiğinde yapılacak işlemler
  }

  fetchButtonClicks(): void {
    if (!this.userId) {
      this.message = 'User ID is required';
      return;
    }

    this.buttonClickService.getButtonClicks(this.userId).subscribe(
      (response: any) => {
        this.buttonClicks = response;
        this.message = '';
      },
      (error: any) => {
        this.message = 'Error fetching button clicks';
        console.error(error);
      }
    );
  }

  logout() {
    // Oturum kapatma işlemleri burada yapılır
    console.log('User logged out');
    sessionStorage.removeItem('userId'); // Oturum kapatma sırasında kullanıcı ID'sini kaldırabilirsiniz
    this.router.navigate(['/login']);
  }
}

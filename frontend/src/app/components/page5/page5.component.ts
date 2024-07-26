import { Component, OnInit } from '@angular/core';
import { ButtonClickService } from '../../services/button-click.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page5',
  templateUrl: './page5.component.html',
  styleUrls: ['./page5.component.css']
})
export class Page5Component implements OnInit {
  userId: string = ''; // Kullanıcı ID'sini manuel olarak al
  buttonClicks: any[] = [];
  message: string = '';

  constructor(private buttonClickService: ButtonClickService, private router: Router) {}

  ngOnInit(): void {
    // Kullanıcı ID'sini sessionStorage'dan alabilirsiniz
    this.userId = sessionStorage.getItem('userId') || ''; // Örneğin, sessionStorage'dan al
  }

  fetchButtonClicks(): void {
    if (!this.userId) {
      this.message = 'User ID is required';
      return;
    }

    this.buttonClickService.getButtonClicks(this.userId).subscribe(
      (response: any[]) => {
        console.log('Button Clicks Response:', response); // Yanıtı kontrol etmek için log
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
    console.log('User logged out');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}

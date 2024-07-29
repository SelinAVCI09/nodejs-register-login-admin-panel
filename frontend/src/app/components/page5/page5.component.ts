import { Component, OnInit } from '@angular/core';
import { ButtonClickService } from '../../services/button-click.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page5',
  templateUrl: './page5.component.html',
  styleUrls: ['./page5.component.css']
})
export class Page5Component implements OnInit {
  userId: number | null = null; // Kullanıcı ID'sini number olarak tanımlayın
  buttonClicks: any[] = [];
  message: string = '';

  constructor(private buttonClickService: ButtonClickService, private router: Router) {}

  ngOnInit(): void {
    // Kullanıcı ID'sini sessionStorage'dan alabilirsiniz
    const userIdFromStorage = sessionStorage.getItem('userId');
    this.userId = userIdFromStorage ? parseInt(userIdFromStorage, 10) : null; // number olarak dönüştürün
  }

  fetchButtonClicks(): void {
    if (this.userId === null) {
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

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
  buttonClickTotals: { button_name: string, total_clicks: number }[] = []; // Toplamları saklayacak dizi
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
        this.calculateButtonClickTotals(); // Toplamları hesapla
      },
      (error: any) => {
        this.message = 'Error fetching button clicks';
        console.error(error);
      }
    );
  }

  calculateButtonClickTotals(): void {
    const totals: { [key: string]: number } = {};

    // Buton adlarını ve toplam tıklama sayılarını hesaplayın
    this.buttonClicks.forEach(click => {
      if (totals[click.button_name]) {
        totals[click.button_name] += click.click_count;
      } else {
        totals[click.button_name] = click.click_count;
      }
    });

    // `buttonClickTotals` dizisini güncelleyin
    this.buttonClickTotals = Object.keys(totals).map(button_name => ({
      button_name,
      total_clicks: totals[button_name]
    }));
  }

  logout() {
    console.log('User logged out');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
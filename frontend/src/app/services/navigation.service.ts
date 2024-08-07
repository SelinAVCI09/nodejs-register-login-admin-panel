import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ButtonClickService } from './button-click.service'; // ButtonClickService'i ekleyin

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private userButtonStatsUrl = 'http://localhost:4002/api/button-stats/user-button-stats';
  private usersUrl = 'http://localhost:4002/api/users';

  constructor(private router: Router, private http: HttpClient, private buttonClickService: ButtonClickService) {}

  // Buton tıklama olayını kaydetme fonksiyonu
  public recordButtonClick(buttonName: string): void {
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
      console.error('No User ID found');
      return;
    }

    const userIdNumber = Number(userId); // Kullanıcı ID'sini numaraya çevirme

    if (isNaN(userIdNumber)) {
      console.error('Invalid User ID');
      return;
    }

    console.log('Sending button click:', { userId: userIdNumber, buttonName });

    this.buttonClickService.recordButtonClick(userIdNumber, buttonName) // Bu satırı kullanarak doğru servisi çağırın
      .subscribe({
        next: (response) => {
          console.log('Button click recorded', response);
        },
        error: (error) => {
          console.error('Error recording button click', error);
        }
      });
  }

  // Kullanıcı buton istatistiklerini alma fonksiyonu
  public getUserButtonStats(): Observable<any[]> {
    return this.http.get<any[]>(this.userButtonStatsUrl);
  }

  // Kullanıcıları alma fonksiyonu
  public getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  // Oturumu kapatma ve yönlendirme fonksiyonu
  public logoutAndRedirect(): void {
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      this.router.navigate(['/login']);
      return;
    }

    // Yönlendirme işlemini başlat
    this.router.navigate(['/login']).then(() => {
      // Yönlendirme tamamlandıktan sonra token'ı ve userId'yi sil
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
    });
  }

  // Token kontrol fonksiyonu
  public checkToken(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token; // Token varsa true, yoksa false döner
  }
}

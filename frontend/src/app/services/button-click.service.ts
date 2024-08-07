import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonClickService {
  private apiUrl = 'http://localhost:4002/api/button-stats'; // Güncellenmiş Backend URL

  constructor(private http: HttpClient) {}

  // Kullanıcı ID'sine göre buton tıklama istatistiklerini getirir
  getButtonClicks(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/button-clicks/${userId}`);
  }

  // Giriş zamanını kaydeder (exit_time olmadan)
  recordButtonClick(userId: number, buttonName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/record-button-click`, { userId, buttonName });
  }
}

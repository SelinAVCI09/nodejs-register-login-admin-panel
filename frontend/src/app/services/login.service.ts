import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:4002/api'; // API URL'iniz

  constructor(private http: HttpClient) {}

  // Kullanıcı giriş metodunu tanımlar
  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  // Buton tıklama verilerini kaydetmek için metod
  recordButtonClick(userId: string, buttonName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/record-button-click`, { userId, buttonName });
  }

  // Kullanıcıya ait buton tıklama verilerini almak için metod
  getButtonClicks(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/button-clicks/${userId}`);
  }
}

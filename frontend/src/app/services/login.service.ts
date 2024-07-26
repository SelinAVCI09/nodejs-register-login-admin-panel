import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:4002/api';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  recordButtonClick(userId: string, buttonName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/record-button-click`, { userId, buttonName });
  }

  getButtonClicks(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/button-clicks/${userId}`);
  }
}

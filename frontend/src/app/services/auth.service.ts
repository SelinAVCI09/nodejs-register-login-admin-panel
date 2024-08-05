import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Adlandırılmış import ile import et

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4002/api'; // API URL'iniz
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) {}

  // Login method
  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  // Store token in local storage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Decode token
  decodeToken(token: string): any {
    return jwtDecode(token); // Adlandırılmış fonksiyon kullanımı
  }

  // Get user ID from token
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken.userId || null; // Token içinde kullanıcı ID'sini elde edin
    }
    return null;
  }

  // Logout method
  logout(): Observable<void> {
    localStorage.removeItem(this.tokenKey);
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }
}

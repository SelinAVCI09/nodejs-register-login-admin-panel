import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; // Named import

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4002/api'; // API URL'iniz
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) {}

  // Kullanıcı giriş metodu
  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
          const userId = this.getUserId(); // Token'dan userId'yi al
          if (userId) {
            sessionStorage.setItem('userId', userId); // Kullanıcı ID'sini sakla
          }
        }
      })
    );
  }

  // Token'ı localStorage'a kaydet
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Token'ı localStorage'dan al
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Token'ı decode et
  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  // Kullanıcı ID'sini decode edilmiş token'dan al
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken.userId || null;
    }
    return null;
  }

  // Token'ın geçerliliğini kontrol et
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodedToken = this.decodeToken(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate > new Date();
  }

  // Çıkış yapma metodu
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey); // Token'ı localStorage'dan kaldır
        sessionStorage.removeItem('userId'); // Kullanıcı ID'sini sessionStorage'dan kaldır
      })
    );
  }
}

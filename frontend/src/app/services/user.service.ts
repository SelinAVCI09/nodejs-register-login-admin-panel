// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4002/api'; // Güncel API URL'inizi buraya ekleyin

  constructor(private http: HttpClient) {}

  // Kullanıcı bilgilerini almak için
  getUserDetails(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  // Kullanıcı buton eylemlerini almak için
  getUserActions(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user-actions/${userId}`);
  }
}

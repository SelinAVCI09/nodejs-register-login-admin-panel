import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Modeli içe aktar

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:4002/api/register'; // API URL'nizi buraya ekleyin

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'; // User modelini içe aktar

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'api/auth/login'; // Backend URL'nizi buraya ekleyin

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }
}

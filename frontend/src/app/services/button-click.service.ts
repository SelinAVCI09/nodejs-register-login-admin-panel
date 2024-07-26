import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonClickService {
  private apiUrl = 'http://localhost:4200/api/button-clicks';

  constructor(private http: HttpClient) {}

  getButtonClicks(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:4002/api/activity';

  constructor(private http: HttpClient) { }

  recordButtonClick(userId: string, buttonName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/click`, { userId, buttonName });
  }

  getButtonStats(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/button-stats/${userId}`);
  }
}

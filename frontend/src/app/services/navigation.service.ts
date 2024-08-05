import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private apiUrl = 'http://localhost:4002/api/button-stats/record-button-click';
  private userButtonStatsUrl = 'http://localhost:4002/api/button-stats/user-button-stats';
  private usersUrl = 'http://localhost:4002/api/users';

  constructor(private router: Router, private http: HttpClient) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.onNavigationStart(event);
      } else if (event instanceof NavigationEnd) {
        this.onNavigationEnd(event);
      } else if (event instanceof NavigationError) {
        this.onNavigationError(event);
      }
    });
  }

  private onNavigationStart(event: NavigationStart): void {
    console.log('Navigation started');
    // Show loading indicator or any other logic
  }

  private onNavigationEnd(event: NavigationEnd): void {
    console.log('Navigation ended');
    // Hide loading indicator or any other logic
    this.urlChange(event.url);
  }

  private onNavigationError(event: NavigationError): void {
    console.error('Navigation error', event.error);
    // Hide loading indicator or present error to user
  }

  public recordButtonClick(buttonName: string): void {
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
      console.error('No User ID found');
      return;
    }

    const userIdNumber = Number(userId); // Convert user ID to a number

    if (isNaN(userIdNumber)) {
      console.error('Invalid User ID');
      return;
    }

    this.http.post(this.apiUrl, { userId: userIdNumber, buttonName })
      .subscribe({
        next: (response) => {
          console.log('Button click recorded', response);
        },
        error: (error) => {
          console.error('Error recording button click', error);
        }
      });
  }

  public getUserButtonStats(): Observable<any[]> {
    return this.http.get<any[]>(this.userButtonStatsUrl);
  }

  public getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  private urlChange(url: string): void {
    console.log('URL changed to:', url);
    // Socket service or any other logic for URL change
  }
}

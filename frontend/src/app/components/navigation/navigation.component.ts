import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  userStats: any[] = [];
  users: any[] = [];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.getUserButtonStats().subscribe(data => {
      this.userStats = data;
    }, error => {
      console.error('Error fetching user button stats', error);
    });

    this.navigationService.getUsers().subscribe(data => {
      this.users = data;
    }, error => {
      console.error('Error fetching users', error);
    });
  }

  getUsername(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : 'Unknown';
  }

  getEmail(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.email : 'Unknown';
  }
}

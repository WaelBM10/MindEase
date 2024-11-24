import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent {
  // Data for stats section
  totalUsers: number = 1234;
  totalSales: number = 12345;
  activeSessions: number = 56;

  // Data for notifications section
  notifications: string[] = [
    'You have a new message',
    'Your profile has been updated',
    'New user registration'
  ];

  constructor() { }
}

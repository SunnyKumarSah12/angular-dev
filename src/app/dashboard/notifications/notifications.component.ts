import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notifications = [
    { message: 'New demand added by John', type: 'info', timestamp: '5 mins ago' },
    { message: 'Profile shared with Client A', type: 'success', timestamp: '1 hour ago' },
    { message: 'Demand 101 has been open for 172 days', type: 'warning', timestamp: 'Today' },
    { message: 'Server downtime scheduled at 8 PM', type: 'error', timestamp: 'Yesterday' }
  ];

  getIcon(type: string): string {
    switch (type) {
      case 'info': return 'info';
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'notifications';
    }
  }
}

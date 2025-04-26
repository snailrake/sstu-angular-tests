import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-student-dashboard', templateUrl: './student-dashboard.component.html', standalone: false })
export class StudentDashboardComponent {
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }
}

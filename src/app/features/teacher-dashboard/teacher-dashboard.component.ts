import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-teacher-dashboard', templateUrl: './teacher-dashboard.component.html', standalone: false })
export class TeacherDashboardComponent {
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }
}

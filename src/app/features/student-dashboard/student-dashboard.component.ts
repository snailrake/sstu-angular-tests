// src/app/student-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MatButtonModule} from '@angular/material/button';
import { Router }        from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [ CommonModule, MatButtonModule ],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  constructor(private router: Router) {}
  logout() {
    this.router.navigate(['/login']);
  }
}

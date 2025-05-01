// src/app/features/student-dashboard/student-dashboard.component.ts
import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';
import { CommonModule }        from '@angular/common';
import { MatButtonModule }     from '@angular/material/button';
import { MatTabsModule }       from '@angular/material/tabs';
import { MatTableModule }      from '@angular/material/table';
import { MatListModule }       from '@angular/material/list';
import { RouterModule }        from '@angular/router';

import { TestService,
  Test,
  StudentResult }      from '../../services/test.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  tests: Test[] = [];
  history: StudentResult[] = [];
  displayedColumns = ['name', 'score'];

  constructor(
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testService.getTests()
      .subscribe(t => this.tests = t);
    this.testService.getResults()
      .subscribe(r => this.history = r);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}

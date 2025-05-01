// src/app/features/teacher-dashboard/teacher-dashboard.component.ts
import { Component, OnInit }      from '@angular/core';
import { Router }                 from '@angular/router';
import { CommonModule }           from '@angular/common';
import { MatButtonModule }        from '@angular/material/button';
import { MatTabsModule }          from '@angular/material/tabs';
import { MatTableModule }         from '@angular/material/table';

import { TestService,
  StudentResult }         from '../../services/test.service';
import { TestCreationComponent }  from '../../test-creation/test-creation.component';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    TestCreationComponent
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  results: StudentResult[] = [];
  displayedColumns = ['name', 'score'];

  constructor(
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testService.getResults()
      .subscribe(r => this.results = r);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}

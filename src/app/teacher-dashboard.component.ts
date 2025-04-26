import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { MatTabsModule }     from '@angular/material/tabs';
import { MatTableModule }    from '@angular/material/table';
import { MatButtonModule }   from '@angular/material/button';

import { TestService, StudentResult } from './services/test.service';
import { TestCreationComponent }      from './test-creation/test-creation.component';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    TestCreationComponent
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  results: StudentResult[] = [];
  displayedColumns = ['name', 'score'];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.results = this.testService.getResults();
  }

  logout(): void {
    // ваша логика логаута
  }
}

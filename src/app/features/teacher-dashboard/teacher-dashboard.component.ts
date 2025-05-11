import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

import { TestService, StudentResult } from '../../services/test.service';
import { TestCreationComponent } from '../../test-creation/test-creation.component';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    TestCreationComponent
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  displayedColumns = ['name', 'score'];
  results$!: Observable<StudentResult[]>;

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.results$ = this.testService.getResults();
  }
}

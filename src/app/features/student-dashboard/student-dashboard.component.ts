import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { forkJoin } from 'rxjs';

import { TestService, Test, StudentResult } from '../../services/test.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  tests: Test[] = [];
  history: { testTitle: string; score: number }[] = [];
  displayedColumns = ['testTitle', 'score'];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    const username = this.getUsername();

    forkJoin({
      tests: this.testService.getTests(),
      results: this.testService.getResultsByStudent(username)
    }).subscribe(({ tests, results }) => {
      this.tests = tests;
      this.history = results.map(result => ({
        testTitle: tests.find(t => String(t.id) === String(result.testId))?.title || '—',
        score: result.score
      }));
    });
  }

  private getUsername(): string {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user?.username;
  }
}

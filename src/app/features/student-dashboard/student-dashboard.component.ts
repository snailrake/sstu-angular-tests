import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { TestService, StudentResult } from '../../services/test.service';

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
  tests: any[] = [];
  history: StudentResult[] = [];
  displayedColumns = ['name', 'score'];

  // Инъекция через конструктор
  constructor(private testService: TestService, private router: Router) {}

  // Инициализация данных
  ngOnInit(): void {
    this.tests = this.testService.getTests(); // Используем после инъекции
    this.history = this.testService.getResults();
  }

  // Логаут
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}

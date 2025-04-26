import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

import { TestService, StudentResult } from '../../services/test.service';
import { TestCreationComponent } from '../../test-creation/test-creation.component';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTabsModule, MatTableModule, TestCreationComponent],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})
export class TeacherDashboardComponent implements OnInit {
  results: StudentResult[] = [];
  displayedColumns = ['name', 'score'];

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('currentUser') || localStorage.getItem('currentUser') !== 'teacher') {
      // Если нет данных о текущем пользователе или это не преподаватель, редиректим на страницу логина
      this.router.navigate(['/login']);
    }
    this.results = this.testService.getResults();
  }

  logout(): void {
    console.log('Logout button clicked');  // Логируем для проверки
    localStorage.removeItem('currentUser'); // Удаляем информацию о текущем пользователе
    this.router.navigate(['/login']); // Редиректим на страницу логина
  }
}

// src/app/app-routing.module.ts
import { Routes } from '@angular/router';

import { LoginComponent }            from './features/login/login.component';
import { TeacherDashboardComponent } from './features/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './features/student-dashboard/student-dashboard.component';
import { TestTakerComponent }        from './test-taker/test-taker.component';
import { AuthGuard }                 from '../core/guards/auth.guard';

export const routes: Routes = [
  { path: '',       redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },

  {
    path: 'teacher',
    component: TeacherDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'teacher' }
  },
  {
    path: 'student',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'student' }
  },
  {
    path: 'test/:id',
    component: TestTakerComponent,
    canActivate: [AuthGuard],
    data: { role: 'student' }
  },

  { path: '**', redirectTo: 'login' }
];

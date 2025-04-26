import { Routes } from '@angular/router';

import { LoginComponent }            from './features/login/login.component';
import { TeacherDashboardComponent } from './teacher-dashboard.component';
import { StudentDashboardComponent } from './features/student-dashboard/student-dashboard.component';

export const routes: Routes = [
  { path: 'login',   component: LoginComponent },
  { path: 'teacher', component: TeacherDashboardComponent },
  { path: 'student', component: StudentDashboardComponent },

  // При заходе на корень — сразу на login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

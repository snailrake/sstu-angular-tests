import { Routes } from '@angular/router';
import { LoginComponent }            from './features/login/login.component';
import { TeacherDashboardComponent } from './features/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './features/student-dashboard/student-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'teacher', component: TeacherDashboardComponent },
  { path: 'student', component: StudentDashboardComponent },
  { path: '**', redirectTo: 'login' }
];





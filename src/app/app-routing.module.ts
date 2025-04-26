import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { StudentDashboardComponent } from './features/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './features/teacher-dashboard/teacher-dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'student', component: StudentDashboardComponent, canActivate: [AuthGuard], data: { role: 'student' } },
    { path: 'teacher', component: TeacherDashboardComponent, canActivate: [AuthGuard], data: { role: 'teacher' } },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

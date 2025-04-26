// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }       from './app.component';
import { LoginComponent }     from './features/login/login.component';
import { StudentDashboardComponent } from './features/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './features/teacher-dashboard/teacher-dashboard.component';

// ——— Импорты Material ———
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatCardModule }      from '@angular/material/card';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        StudentDashboardComponent,
        TeacherDashboardComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule, // обязательно для Angular Material!
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        // ——— Material модули ———
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

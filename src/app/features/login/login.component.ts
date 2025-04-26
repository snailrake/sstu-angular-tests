import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';  // Исправлено
import { MatInputModule } from '@angular/material/input';  // Исправлено
import { MatButtonModule } from '@angular/material/button';  // Исправлено

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, RouterModule, MatFormFieldModule, MatInputModule],  // Исправлено
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    const { username, password } = this.form.value;

    // Примерная логика аутентификации
    if (username === 'teacher' && password === '123') {
      localStorage.setItem('currentUser', 'teacher');
      this.router.navigate(['/teacher']);
    } else if (username === 'student' && password === '123') {
      localStorage.setItem('currentUser', 'student');
      this.router.navigate(['/student']);
    } else {
      this.error = 'Неверное имя пользователя или пароль';
    }
  }
}

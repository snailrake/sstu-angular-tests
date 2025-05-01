import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.error = 'Пожалуйста, заполните оба поля';
      return;
    }

    const { username, password } = this.form.value;

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

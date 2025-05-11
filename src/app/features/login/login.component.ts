import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.error = null;

    const { username, password } = this.form.value;
    this.auth.login(username, password)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe(success => {
        if (!success) {
          this.error = 'Неверное имя пользователя или пароль';
        }
      });
  }
}

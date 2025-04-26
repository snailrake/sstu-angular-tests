import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-login', templateUrl: './login.component.html', standalone: false })
export class LoginComponent {
  form: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });
  }

  submit() {
    this.auth.login(this.form.value.username, this.form.value.password).subscribe(ok => {
      if (ok) {
        const role = this.auth.currentUser?.role;
        this.router.navigate([role === 'teacher' ? '/teacher' : '/student']);
      } else {
        this.error = 'Неправильный логин или пароль';
      }
    });
  }
}

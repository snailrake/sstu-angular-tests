import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../app/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  // Простейшие данные — можно заменить на API-вызовы
  private users: User[] = [
    { username: 'student', password: '123', role: 'student' },
    { username: 'teacher', password: '123', role: 'teacher' }
  ];

  constructor(private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUserSubject.next(user);
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
}

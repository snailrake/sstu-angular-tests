import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../app/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // сразу пытаемся взять из localStorage
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  // у вас “база” пользователей в памяти
  private users: Array<{ username: string; password: string; role: User['role'] }> = [
    { username: 'student', password: '123', role: 'student' },
    { username: 'teacher', password: '123', role: 'teacher' },
  ];

  constructor(private router: Router) {}

  private getUserFromStorage(): User | null {
    const stored = localStorage.getItem('currentUser');
    if (!stored) return null;
    try {
      return JSON.parse(stored) as User;
    } catch {
      // если parse упал — просто очищаем
      localStorage.removeItem('currentUser');
      return null;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const found = this.users.find(u => u.username === username && u.password === password);
    if (found) {
      const user: User = { username: found.username, role: found.role };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      // редирект по роли
      this.router.navigate([found.role]);
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
}

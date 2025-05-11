import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../app/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  private users: { username: string; password: string; role: 'student' | 'teacher' }[] = [
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
      localStorage.removeItem('currentUser');
      return null;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      const { username: userName, role } = user;
      const currentUser: User = { username: userName, role };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.currentUserSubject.next(currentUser);
      this.router.navigate([role]);
      return of(true);
    }
    return of(false);
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

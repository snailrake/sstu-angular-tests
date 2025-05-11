import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role'] as string;
    const user = this.auth.currentUser;
    if (user && user.role === expectedRole) {
      return true;
    }
    // неавторизован или не тот роль — на логин
    this.router.navigate(['/login']);
    return false;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role'] as string;
    const currentRole = localStorage.getItem('currentUser');
    if (currentRole === expectedRole) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>({
    id: '1',
    email: 'user@example.com',
    name: 'Mock User',
    roles: ['admin'],
    permissions: ['product:create', 'product:edit', 'security:approve', 'reviewer:access'],
  });

  user$ = this.currentUser.asReadonly();

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  hasPermission(permission: string): boolean {
    return this.currentUser()?.permissions.includes(permission) ?? false;
  }

  login(email: string, password: string): Observable<User> {
    return of(this.currentUser()!);
  }

  logout(): void {
    this.currentUser.set(null);
  }

  getToken(): string {
    return 'mock-jwt-token';
  }
}

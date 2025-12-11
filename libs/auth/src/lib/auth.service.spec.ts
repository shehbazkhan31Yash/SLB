import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return authenticated status', () => {
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should check permissions', () => {
    expect(service.hasPermission('product:create')).toBe(true);
    expect(service.hasPermission('invalid:permission')).toBe(false);
  });
});

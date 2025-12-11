import { Routes } from '@angular/router';
import { PermissionGuard } from '@alm-platform/auth';

export const REVIEWER_ROUTES: Routes = [
  {
    path: '',
    canActivate: [PermissionGuard('reviewer:access')],
    loadComponent: () =>
      import('./components/reviewer-console.component').then((m) => m.ReviewerConsoleComponent),
  },
];

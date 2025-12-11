import { Routes } from '@angular/router';
import { AuthGuard } from '@alm-platform/auth';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@alm-platform/features/dashboard').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@alm-platform/features/product-onboarding').then((m) => m.PRODUCT_ROUTES),
  },
  {
    path: 'versions',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@alm-platform/features/versioning').then((m) => m.VERSION_ROUTES),
  },
  {
    path: 'destinations',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@alm-platform/features/destinations-board').then((m) => m.DESTINATIONS_ROUTES),
  },
  {
    path: 'qualification',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@alm-platform/features/qualification').then((m) => m.QUALIFICATION_ROUTES),
  },
  {
    path: 'reviewer',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@alm-platform/features/reviewer-console').then((m) => m.REVIEWER_ROUTES),
  },
  {
    path: 'market-material',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@alm-platform/features/market-material').then((m) => m.MARKET_MATERIAL_ROUTES),
  },
  {
    path: 'commercial',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@alm-platform/features/commercial').then((m) => m.COMMERCIAL_ROUTES),
  },
  {
    path: 'legal',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@alm-platform/features/legal').then((m) => m.LEGAL_ROUTES),
  },
];

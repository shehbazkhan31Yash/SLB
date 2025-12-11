import { Routes } from '@angular/router';

export const LEGAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/legal.component').then((m) => m.LegalComponent),
  },
];

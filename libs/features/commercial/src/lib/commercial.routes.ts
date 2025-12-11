import { Routes } from '@angular/router';

export const COMMERCIAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/commercial.component').then((m) => m.CommercialComponent),
  },
];

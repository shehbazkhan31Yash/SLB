import { Routes } from '@angular/router';

export const VERSION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/version-list.component').then((m) => m.VersionListComponent),
  },
];

import { Routes } from '@angular/router';

export const DESTINATIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/destinations-board.component').then((m) => m.DestinationsBoardComponent),
  },
];

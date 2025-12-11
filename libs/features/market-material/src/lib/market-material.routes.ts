import { Routes } from '@angular/router';

export const MARKET_MATERIAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/market-material.component').then((m) => m.MarketMaterialComponent),
  },
];

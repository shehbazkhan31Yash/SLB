import { Routes } from '@angular/router';

export const QUALIFICATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/questionnaire.component').then((m) => m.QuestionnaireComponent),
  },
  {
    path: 'checks',
    loadComponent: () =>
      import('./components/automated-checks.component').then((m) => m.AutomatedChecksComponent),
  },
];

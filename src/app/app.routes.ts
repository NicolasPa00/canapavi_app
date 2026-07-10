import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.page').then((m) => m.LandingPage),
    title: 'Fundación CANAPAVI · Cultura, memoria e identidad del Pacífico',
  },
  { path: '**', redirectTo: '' },
];

import { Routes } from '@angular/router';
import { IntroGuard } from './guard/intro.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [IntroGuard], // proteger la raíz
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then(m => m.IntroPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
];

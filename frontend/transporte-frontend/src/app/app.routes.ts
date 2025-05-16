import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'vehiculos',
    loadChildren: () => import('./modules/vehiculos/vehiculos.routes').then(m => m.VEHICULOS_ROUTES)
  },
  {
    path: 'conductores',
    loadChildren: () => import('./modules/conductores/conductores.routes').then(m => m.CONDUCTORES_ROUTES)
  },
  {
    path: 'viajes',
    loadChildren: () => import('./modules/viajes/viajes.routes').then(m => m.VIAJES_ROUTES)
  }
];
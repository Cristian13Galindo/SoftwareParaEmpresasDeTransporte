import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const VIAJES_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/viajes/viajes-list/viajes-list.component')
      .then(m => m.ViajesListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/viajes/viaje-form/viaje-form.component')
      .then(m => m.ViajeFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/viajes/viaje-detail/viaje-detail.component')
      .then(m => m.ViajeDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/viajes/viaje-form/viaje-form.component')
      .then(m => m.ViajeFormComponent)
  }
];
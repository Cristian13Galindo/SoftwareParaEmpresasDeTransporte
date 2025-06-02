import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const ESTADOS_VIAJE_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/estados-viaje/estados-viaje-list/estados-viaje-list.component')
      .then(m => m.EstadosViajeListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/estados-viaje/estado-viaje-form/estado-viaje-form.component')
      .then(m => m.EstadoViajeFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/estados-viaje/estado-viaje-detail/estado-viaje-detail.component')
      .then(m => m.EstadoViajeDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/estados-viaje/estado-viaje-form/estado-viaje-form.component')
      .then(m => m.EstadoViajeFormComponent)
  }
];
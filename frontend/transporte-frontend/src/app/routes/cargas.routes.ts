import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const CARGAS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/cargas/cargas-list/cargas-list.component')
      .then(m => m.CargasListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/cargas/carga-form/carga-form.component')
      .then(m => m.CargaFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/cargas/carga-detail/carga-detail.component')
      .then(m => m.CargaDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/cargas/carga-form/carga-form.component')
      .then(m => m.CargaFormComponent)
  }
];
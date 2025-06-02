import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const CONDUCTORES_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/conductores/conductores-list/conductores-list.component')
      .then(m => m.ConductoresListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/conductores/conductor-form/conductor-form.component').then(m => m.ConductorFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/conductores/conductor-detail/conductor-detail.component').then(m => m.ConductorDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/conductores/conductor-form/conductor-form.component').then(m => m.ConductorFormComponent)
  }
];

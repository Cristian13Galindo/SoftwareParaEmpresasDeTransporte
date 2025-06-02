import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const CLIENTE_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/cliente/cliente-list/cliente-list.component')
      .then(m => m.ClienteListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/cliente/cliente-form/cliente-form.component')
      .then(m => m.ClienteFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/cliente/cliente-detail/cliente-detail.component')
      .then(m => m.ClienteDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/cliente/cliente-form/cliente-form.component')
      .then(m => m.ClienteFormComponent)
  }
];

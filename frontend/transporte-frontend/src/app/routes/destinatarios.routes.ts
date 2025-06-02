import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const DESTINATARIOS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/destinatarios/destinatarios-list/destinatarios-list.component')
      .then(m => m.DestinatariosListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/destinatarios/destinatario-form/destinatario-form.component')
      .then(m => m.DestinatarioFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/destinatarios/destinatario-detail/destinatario-detail.component')
      .then(m => m.DestinatarioDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/destinatarios/destinatario-form/destinatario-form.component')
      .then(m => m.DestinatarioFormComponent)
  }
];
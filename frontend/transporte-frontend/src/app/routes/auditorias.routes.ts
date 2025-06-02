import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const AUDITORIAS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/auditorias/auditorias-list/auditorias-list.component')
      .then(m => m.AuditoriasListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/auditorias/auditoria-form/auditoria-form.component')
      .then(m => m.AuditoriaFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/auditorias/auditoria-detail/auditoria-detail.component')
      .then(m => m.AuditoriaDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/auditorias/auditoria-form/auditoria-form.component')
      .then(m => m.AuditoriaFormComponent)
  }
];
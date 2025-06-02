import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const AUDITORIAS_LOGIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/auditorias-login/auditorias-login-list/auditorias-login-list.component')
      .then(m => m.AuditoriasLoginListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/auditorias-login/auditoria-login-form/auditoria-login-form.component')
      .then(m => m.AuditoriaLoginFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/auditorias-login/auditoria-login-detail/auditoria-login-detail.component')
      .then(m => m.AuditoriaLoginDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/auditorias-login/auditoria-login-form/auditoria-login-form.component')
      .then(m => m.AuditoriaLoginFormComponent)
  }
];
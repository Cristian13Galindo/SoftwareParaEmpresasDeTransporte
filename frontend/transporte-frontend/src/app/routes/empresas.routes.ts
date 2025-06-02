import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const EMPRESAS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/empresas/empresas-list/empresas-list.component')
      .then(m => m.EmpresasListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/empresas/empresa-form/empresa-form.component')
      .then(m => m.EmpresaFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/empresas/empresa-detail/empresa-detail.component')
      .then(m => m.EmpresaDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/empresas/empresa-form/empresa-form.component')
      .then(m => m.EmpresaFormComponent)
  }
];
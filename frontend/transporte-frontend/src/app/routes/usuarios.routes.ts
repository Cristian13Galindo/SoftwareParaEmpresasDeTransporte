import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const USUARIOS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/usuarios/usuarios-list/usuarios-list.component')
      .then(m => m.UsuariosListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/usuarios/usuario-form/usuario-form.component')
      .then(m => m.UsuarioFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/usuarios/usuario-detail/usuario-detail.component')
      .then(m => m.UsuarioDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/usuarios/usuario-form/usuario-form.component')
      .then(m => m.UsuarioFormComponent)
  }
];
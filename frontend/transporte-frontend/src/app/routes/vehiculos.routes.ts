import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const VEHICULOS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/vehiculos/vehiculos-list/vehiculos-list.component')
      .then(m => m.VehiculosListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/vehiculos/vehiculo-form/vehiculo-form.component')
      .then(m => m.VehiculoFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/vehiculos/vehiculo-detail/vehiculo-detail.component')
      .then(m => m.VehiculoDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/vehiculos/vehiculo-form/vehiculo-form.component')
      .then(m => m.VehiculoFormComponent)
  }
];

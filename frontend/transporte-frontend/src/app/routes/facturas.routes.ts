import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const FACTURAS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../modules/facturas/facturas-list/facturas-list.component')
      .then(m => m.FacturasListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('../modules/facturas/factura-form/factura-form.component')
      .then(m => m.FacturaFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../modules/facturas/factura-detail/factura-detail.component')
      .then(m => m.FacturaDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('../modules/facturas/factura-form/factura-form.component')
      .then(m => m.FacturaFormComponent)
  }
];
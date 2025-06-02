import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent) 
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
         path: 'vehiculos',
         loadChildren: () => import('./routes/vehiculos.routes').then(m => m.VEHICULOS_ROUTES)
      },
      {
        path: 'conductores',
        loadChildren: () => import('./routes/conductores.routes').then(m => m.CONDUCTORES_ROUTES)
      },
      {
        path: 'cargas',
        loadChildren: () => import('./routes/cargas.routes').then(m => m.CARGAS_ROUTES)
      },
      {
         path: 'viajes',
         loadChildren: () => import('./routes/viajes.routes').then(m => m.VIAJES_ROUTES)
      },
      {
       path: 'clientes',
      loadChildren: () => import('./routes/cliente.routes').then(m => m.CLIENTE_ROUTES)
      },
      // {
      //   path: 'auditorias',
      //   loadChildren: () => import('./routes/auditorias.routes').then(m => m.AUDITORIAS_ROUTES)
      // },
      // {
      //   path: 'auditorias-login',
      //   loadChildren: () => import('./routes/auditorias-login.routes').then(m => m.AUDITORIAS_LOGIN_ROUTES)
      // },
       {
         path: 'destinatarios',
         loadChildren: () => import('./routes/destinatarios.routes').then(m => m.DESTINATARIOS_ROUTES)
       },
       {
         path: 'empresas',
         loadChildren: () => import('./routes/empresas.routes').then(m => m.EMPRESAS_ROUTES)
       },
       {
         path: 'estados-viaje',
         loadChildren: () => import('./routes/estados-viaje.routes').then(m => m.ESTADOS_VIAJE_ROUTES)
       },
       {
         path: 'facturas',
         loadChildren: () => import('./routes/facturas.routes').then(m => m.FACTURAS_ROUTES)
       },
      // {
      //   path: 'usuarios',
      //   loadChildren: () => import('./routes/usuarios.routes').then(m => m.USUARIOS_ROUTES)
      // },
      // {
      //   path: 'api-test',
      //   loadComponent: () => import('./modules/api-test/api-test.component').then(m => m.ApiTestComponent)
      // }
    ]
  }
];

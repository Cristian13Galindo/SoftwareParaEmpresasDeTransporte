import { Routes } from '@angular/router';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

export const CLIENTE_ROUTES: Routes = [
  { 
    path: '', 
    component: ClienteListComponent 
  },
  { 
    path: 'nuevo', 
    component: ClienteFormComponent 
  },
  { 
    path: 'editar/:id', 
    component: ClienteFormComponent 
  }
];

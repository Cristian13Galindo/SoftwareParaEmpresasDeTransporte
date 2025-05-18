import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

const routes: Routes = [
  { path: '', component: ClienteListComponent },
  { path: 'nuevo', component: ClienteFormComponent },
  { path: 'editar/:id', component: ClienteFormComponent }
];

@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ClienteModule { }

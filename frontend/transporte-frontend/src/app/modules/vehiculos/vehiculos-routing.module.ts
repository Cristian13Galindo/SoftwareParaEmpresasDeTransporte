import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosListComponent } from './vehiculos-list/vehiculos-list.component';
import { VehiculoDetailComponent } from './vehiculo-detail/vehiculo-detail.component';
import { VehiculoFormComponent } from './vehiculo-form/vehiculo-form.component';

const routes: Routes = [
  { path: '', component: VehiculosListComponent },
  { path: 'new', component: VehiculoFormComponent },
  { path: ':id', component: VehiculoDetailComponent },
  { path: ':id/edit', component: VehiculoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
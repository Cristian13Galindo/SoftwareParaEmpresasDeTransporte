import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { VehiculosListComponent } from './vehiculos-list/vehiculos-list.component';
import { VehiculoDetailComponent } from './vehiculo-detail/vehiculo-detail.component';
import { VehiculoFormComponent } from './vehiculo-form/vehiculo-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VehiculosRoutingModule,
    VehiculosListComponent,
    VehiculoDetailComponent,
    VehiculoFormComponent
  ]
})
export class VehiculosModule { }
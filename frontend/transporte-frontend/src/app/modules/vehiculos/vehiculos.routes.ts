import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehiculos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="mt-4 mb-4">Gesti�n de Veh�culos</h2>
      <div class="alert alert-info">
        M�dulo en desarrollo. Estar� disponible pr�ximamente.
      </div>
      <button class="btn btn-secondary" routerLink="/dashboard">Volver al Dashboard</button>
    </div>
  `
})
export class VehiculosListComponent {}

export const VEHICULOS_ROUTES: Routes = [
  {
    path: '',
    component: VehiculosListComponent
  }
];

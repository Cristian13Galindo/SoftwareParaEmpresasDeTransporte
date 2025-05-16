import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-viajes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>Gestión de Viajes</h2>
      <p>Módulo en desarrollo. Estará disponible próximamente.</p>
      <a routerLink="/dashboard" class="btn btn-secondary">Volver al Dashboard</a>
    </div>
  `
})
export class ViajesListComponent {}
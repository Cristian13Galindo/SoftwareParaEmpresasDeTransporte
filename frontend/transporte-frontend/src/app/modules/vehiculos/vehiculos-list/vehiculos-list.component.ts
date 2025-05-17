import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VehiculoService } from '../../../services/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo.model';

@Component({
  selector: 'app-vehiculos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Vehículos</h2>
        <a routerLink="new" class="btn btn-primary">Agregar Vehículo</a>
      </div>
      
      <div class="card">
        <div class="card-body">
          <div *ngIf="loading" class="text-center p-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
          
          <div *ngIf="error" class="alert alert-danger">
            {{ error }}
          </div>
          
          <div *ngIf="!loading && !error">
            <div *ngIf="vehiculos.length === 0" class="text-center p-5">
              <p>No se encontraron vehículos registrados.</p>
            </div>
            
            <table *ngIf="vehiculos.length > 0" class="table table-striped">
              <thead>
                <tr>
                  <th>Placa</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Capacidad (Ton)</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let vehiculo of vehiculos">
                  <td>{{ vehiculo.placa }}</td>
                  <td>{{ vehiculo.marca }}</td>
                  <td>{{ vehiculo.modelo }}</td>
                  <td>{{ vehiculo.capacidad_maxima_toneladas }}</td>
                  <td>
                    <span [ngClass]="{
                      'badge bg-success': vehiculo.estado === 'Activo',
                      'badge bg-warning': vehiculo.estado === 'Mantenimiento',
                      'badge bg-danger': vehiculo.estado === 'Inactivo'
                    }">{{ vehiculo.estado }}</span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-info me-1" [routerLink]="[vehiculo.id_vehiculo]">Ver</button>
                    <button class="btn btn-sm btn-warning me-1" [routerLink]="[vehiculo.id_vehiculo, 'edit']">Editar</button>
                    <button class="btn btn-sm btn-danger" (click)="deleteVehiculo(vehiculo.id_vehiculo)">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div class="mt-3">
        <a routerLink="/dashboard" class="btn btn-secondary">Volver al Dashboard</a>
      </div>
    </div>
  `
})
export class VehiculosListComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  loading = false;
  error = '';

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.loadVehiculos();
  }

  loadVehiculos(): void {
    this.loading = true;
    this.vehiculoService.getAll().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando vehículos:', error);
        this.error = 'Error al cargar los vehículos. Intente nuevamente más tarde.';
        this.loading = false;
      }
    });
  }

  deleteVehiculo(id: number): void {
    if (confirm('¿Está seguro de eliminar este vehículo?')) {
      this.vehiculoService.delete(id).subscribe({
        next: () => {
          this.vehiculos = this.vehiculos.filter(v => v.id_vehiculo !== id);
        },
        error: (error) => {
          console.error('Error eliminando vehículo:', error);
          this.error = 'Error al eliminar el vehículo. Intente nuevamente más tarde.';
        }
      });
    }
  }
}
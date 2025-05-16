import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface Vehiculo {
  id_vehiculo?: number;
  placa: string;
  marca: string;
  modelo: string;
  capacidad_maxima_toneladas: number;
  estado: string;
  empresa_id: number;
}

@Component({
  selector: 'app-vehiculos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Vehículos</h2>
        <button class="btn btn-primary">Agregar Vehículo</button>
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
                    <button class="btn btn-sm btn-info me-1">Ver</button>
                    <button class="btn btn-sm btn-warning me-1">Editar</button>
                    <button class="btn btn-sm btn-danger">Eliminar</button>
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadVehiculos();
  }

  loadVehiculos() {
    this.loading = true;
    this.error = '';

    this.http.get<Vehiculo[]>(`${environment.apiUrl}/vehiculos/`)
      .subscribe({
        next: (data) => {
          this.vehiculos = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando vehículos:', error);
          this.error = 'Error al cargar los vehículos. Puede que la API no esté disponible.';
          this.loading = false;
          
          // Para pruebas, cargamos datos de ejemplo
          this.vehiculos = [
            {
              id_vehiculo: 1,
              placa: 'ABC123',
              marca: 'Volvo',
              modelo: 'FH16',
              capacidad_maxima_toneladas: 20,
              estado: 'Activo',
              empresa_id: 1
            },
            {
              id_vehiculo: 2,
              placa: 'XYZ789',
              marca: 'Mercedes',
              modelo: 'Actros',
              capacidad_maxima_toneladas: 18,
              estado: 'Mantenimiento',
              empresa_id: 1
            }
          ];
        }
      });
  }
}
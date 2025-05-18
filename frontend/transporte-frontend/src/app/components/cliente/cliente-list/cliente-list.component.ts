import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Clientes</h2>
        <a routerLink="nuevo" class="btn btn-primary">Agregar Cliente</a>
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
            <div *ngIf="clientes.length === 0" class="text-center p-5">
              <p>No se encontraron clientes registrados.</p>
            </div>

            <table *ngIf="clientes.length > 0" class="table table-striped">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>NIT</th>
                  <th>Contacto</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let cliente of clientes">
                  <td>{{ cliente.nombre_empresa }}</td>
                  <td>{{ cliente.nit }}</td>
                  <td>{{ cliente.contacto }}</td>
                  <td>{{ cliente.telefono }}</td>
                  <td>
                    <button class="btn btn-sm btn-info me-1" [routerLink]="[cliente.id_cliente]">Ver</button>
                    <button class="btn btn-sm btn-warning me-1" [routerLink]="['editar', cliente.id_cliente]">Editar</button>
                    <button class="btn btn-sm btn-danger" (click)="deleteCliente(cliente.id_cliente)">Eliminar</button>
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
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  loading = false;
  error = '';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.loading = true;
    this.clienteService.getAll().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando clientes:', error);
        this.error = 'Error al cargar los clientes. Intente nuevamente más tarde.';
        this.loading = false;
      }
    });
  }

  deleteCliente(id: number | undefined): void {
    if (id === undefined) return;
    
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteService.delete(id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(c => c.id_cliente !== id);
        },
        error: (error) => {
          console.error('Error eliminando cliente:', error);
          this.error = 'Error al eliminar el cliente. Intente nuevamente más tarde.';
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>{{ editMode ? 'Editar' : 'Registrar' }} Cliente</h2>
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

          <form [formGroup]="clienteForm" (ngSubmit)="onSubmit()" *ngIf="!loading">
            <div class="mb-3">
              <label for="nombre_empresa" class="form-label">Nombre de la Empresa</label>
              <input type="text" class="form-control" id="nombre_empresa" formControlName="nombre_empresa">
              <div *ngIf="clienteForm.controls['nombre_empresa'].invalid && (clienteForm.controls['nombre_empresa'].dirty || clienteForm.controls['nombre_empresa'].touched)" class="text-danger">
                <div *ngIf="clienteForm.controls['nombre_empresa'].errors?.['required']">El nombre de la empresa es requerido.</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="nit" class="form-label">NIT</label>
              <input type="text" class="form-control" id="nit" formControlName="nit">
              <div *ngIf="clienteForm.controls['nit'].invalid && (clienteForm.controls['nit'].dirty || clienteForm.controls['nit'].touched)" class="text-danger">
                <div *ngIf="clienteForm.controls['nit'].errors?.['required']">El NIT es requerido.</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="contacto" class="form-label">Nombre de Contacto</label>
              <input type="text" class="form-control" id="contacto" formControlName="contacto">
              <div *ngIf="clienteForm.controls['contacto'].invalid && (clienteForm.controls['contacto'].dirty || clienteForm.controls['contacto'].touched)" class="text-danger">
                <div *ngIf="clienteForm.controls['contacto'].errors?.['required']">El contacto es requerido.</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="direccion" class="form-label">Dirección</label>
              <input type="text" class="form-control" id="direccion" formControlName="direccion">
              <div *ngIf="clienteForm.controls['direccion'].invalid && (clienteForm.controls['direccion'].dirty || clienteForm.controls['direccion'].touched)" class="text-danger">
                <div *ngIf="clienteForm.controls['direccion'].errors?.['required']">La dirección es requerida.</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="telefono" class="form-label">Teléfono</label>
              <input type="text" class="form-control" id="telefono" formControlName="telefono">
              <div *ngIf="clienteForm.controls['telefono'].invalid && (clienteForm.controls['telefono'].dirty || clienteForm.controls['telefono'].touched)" class="text-danger">
                <div *ngIf="clienteForm.controls['telefono'].errors?.['required']">El teléfono es requerido.</div>
              </div>
            </div>

            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary" [disabled]="clienteForm.invalid || submitting">
                {{ submitting ? 'Guardando...' : 'Guardar' }}
              </button>
              <a routerLink=".." class="btn btn-secondary">Cancelar</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup;
  editMode = false;
  clienteId: number | null = null;
  loading = false;
  submitting = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      nombre_empresa: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      contacto: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.clienteId = +params['id'];
        this.loadCliente(this.clienteId);
      }
    });
  }

  loadCliente(id: number): void {
    this.loading = true;
    this.clienteService.getById(id).subscribe({
      next: (cliente) => {
        this.clienteForm.patchValue(cliente);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando cliente:', error);
        this.error = 'Error al cargar los datos del cliente. Intente nuevamente más tarde.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) return;
    
    this.submitting = true;
    const cliente: Cliente = this.clienteForm.value;
    
    const operation = this.editMode && this.clienteId
      ? this.clienteService.update(this.clienteId, cliente)
      : this.clienteService.create(cliente);

    operation.subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: (error) => {
        console.error('Error guardando cliente:', error);
        this.error = 'Error al guardar el cliente. Intente nuevamente más tarde.';
        this.submitting = false;
      }
    });
  }
}

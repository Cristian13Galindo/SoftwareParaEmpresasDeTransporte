import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { VehiculoService } from '../../../services/vehiculo.service';
import { EmpresaService } from '../../../services/empresa.service';
import { Vehiculo } from '../../../models/vehiculo.model';
import { Empresa } from '../../../models/empresa.model';

@Component({
  selector: 'app-vehiculo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './vehiculo-form.component.html',
  styleUrls: ['./vehiculo-form.component.css']
})
export class VehiculoFormComponent implements OnInit {
  vehiculoForm!: FormGroup;
  vehiculoId?: number;
  isEditMode = false;
  loading = false;
  error = '';
  empresas: Empresa[] = [];

  constructor(
    private fb: FormBuilder,
    private vehiculoService: VehiculoService,
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEmpresas();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.vehiculoId = +params['id'];
        this.isEditMode = true;
        this.loadVehiculoData();
      }
    });
  }

  private initForm(): void {
    this.vehiculoForm = this.fb.group({
      placa: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      capacidad_maxima_toneladas: ['', [Validators.required, Validators.min(0.1)]],
      estado: ['Activo', [Validators.required]],
      empresa_id: ['', [Validators.required]]
    });
  }

  loadEmpresas(): void {
    this.empresaService.getAll().subscribe({
      next: (data) => {
        this.empresas = data;
      },
      error: (error) => {
        this.error = 'Error al cargar las empresas';
        console.error('Error loading empresas', error);
      }
    });
  }

  loadVehiculoData(): void {
    if (!this.vehiculoId) return;
    
    this.loading = true;
    this.vehiculoService.getById(this.vehiculoId).subscribe({
      next: (vehiculo) => {
        this.vehiculoForm.patchValue(vehiculo);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los datos del vehículo';
        this.loading = false;
        console.error('Error loading vehiculo data', error);
      }
    });
  }

  onSubmit(): void {
    if (this.vehiculoForm.invalid) {
      this.vehiculoForm.markAllAsTouched();
      return;
    }
    
    this.loading = true;
    const vehiculoData: Vehiculo = this.vehiculoForm.value;
    
    if (this.isEditMode && this.vehiculoId) {
      this.vehiculoService.update(this.vehiculoId, vehiculoData).subscribe({
        next: () => {
          this.router.navigate(['/vehiculos']);
        },
        error: (error) => {
          this.error = 'Error al actualizar el vehículo';
          this.loading = false;
          console.error('Error updating vehiculo', error);
        }
      });
    } else {
      this.vehiculoService.create(vehiculoData).subscribe({
        next: () => {
          this.router.navigate(['/vehiculos']);
        },
        error: (error) => {
          this.error = 'Error al crear el vehículo';
          this.loading = false;
          console.error('Error creating vehiculo', error);
        }
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.vehiculoForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
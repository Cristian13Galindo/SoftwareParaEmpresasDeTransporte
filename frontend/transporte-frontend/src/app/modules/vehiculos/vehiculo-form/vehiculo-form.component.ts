import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Vehiculo } from '../../../models/vehiculo.model';
import { VehiculoService } from '../../../services/vehiculo.service';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-vehiculo-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './vehiculo-form.component.html'
})
export class VehiculoFormComponent implements OnInit {
  vehiculo: Vehiculo = {
    placa: '',
    marca: '',
    modelo: '',
    capacidad_maxima_toneladas: 0,
    estado: '',
    id_empresa: 0
  };
  
  empresas: any[] = [];
  isEditing = false;
  loading = false;
  saving = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehiculoService: VehiculoService,
    private empresaService: EmpresaService
  ) {}
  
  ngOnInit(): void {
    this.loadEmpresas();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loading = true;
      this.vehiculoService.getById(Number(id)).subscribe({
        next: (data) => {
          this.vehiculo = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los datos del vehículo';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  loadEmpresas(): void {
    this.empresaService.getAll().subscribe({
      next: (data) => this.empresas = data,
      error: (err) => console.error('Error cargando empresas:', err)
    });
  }
  
  onSubmit(): void {
    this.saving = true;
    this.error = '';
    
    const operation = this.isEditing 
      ? this.vehiculoService.update(this.vehiculo)
      : this.vehiculoService.create(this.vehiculo);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/dashboard/vehiculos']);
      },
      error: (err) => {
        this.error = err;
        this.saving = false;
      }
    });
  }
}
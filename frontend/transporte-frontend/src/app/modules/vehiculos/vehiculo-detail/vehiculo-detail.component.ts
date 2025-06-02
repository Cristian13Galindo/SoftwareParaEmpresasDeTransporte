import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from '../../../models/vehiculo.model';
import { VehiculoService } from '../../../services/vehiculo.service';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-vehiculo-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vehiculo-detail.component.html',
  styleUrls: ['./vehiculo-detail.component.css']
})
export class VehiculoDetailComponent implements OnInit {
  vehiculo: Vehiculo | null = null;
  empresa: any = null;
  loading = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehiculoService: VehiculoService,
    private empresaService: EmpresaService
  ) {}
  
  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID no válido';
      this.loading = false;
      return;
    }
    
    this.vehiculoService.getById(Number(id)).subscribe({
      next: (data) => {
        this.vehiculo = data;
        this.loadEmpresa(data.id_empresa);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del vehículo';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadEmpresa(id: number): void {
    this.empresaService.getById(id).subscribe({
      next: (data) => this.empresa = data,
      error: (err) => console.error('Error cargando empresa:', err)
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'activo':
        return 'bg-success';
      case 'mantenimiento':
        return 'bg-warning';
      case 'inactivo':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  onDelete(): void {
    if (!this.vehiculo?.id_vehiculo) return;

    if (confirm('¿Está seguro de eliminar este vehículo?')) {
      this.vehiculoService.delete(this.vehiculo.id_vehiculo).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/vehiculos']);
        },
        error: (err) => {
          this.error = 'Error al eliminar el vehículo';
          console.error(err);
        }
      });
    }
  }
}
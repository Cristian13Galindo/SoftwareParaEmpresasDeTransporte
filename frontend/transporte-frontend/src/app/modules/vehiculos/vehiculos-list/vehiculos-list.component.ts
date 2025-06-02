import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Vehiculo } from '../../../models/vehiculo.model';
import { VehiculoService } from '../../../services/vehiculo.service';

@Component({
  selector: 'app-vehiculos-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './vehiculos-list.component.html',
  styleUrls: ['./vehiculos-list.component.css']
})
export class VehiculosListComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  filteredVehiculos: Vehiculo[] = [];
  searchTerm: string = '';
  searchField: string = 'placa';
  loading: boolean = false;
  error: string | null = null;

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.loadVehiculos();
  }

  loadVehiculos(): void {
    this.loading = true;
    this.vehiculoService.getAll().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.filteredVehiculos = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los vehículos';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredVehiculos = [...this.vehiculos];
      return;
    }

    const searchValue = this.searchTerm.toLowerCase().trim();
    
    this.filteredVehiculos = this.vehiculos.filter(vehiculo => {
      switch (this.searchField) {
        case 'placa':
          return vehiculo.placa.toLowerCase().includes(searchValue);
        case 'marca':
          return vehiculo.marca.toLowerCase().includes(searchValue);
        case 'modelo':
          return vehiculo.modelo.toLowerCase().includes(searchValue);
        case 'estado':
          return vehiculo.estado.toLowerCase().includes(searchValue);
        default:
          return false;
      }
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

  deleteVehiculo(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Está seguro que desea eliminar este vehículo?')) {
      this.vehiculoService.delete(id).subscribe({
        next: () => {
          this.vehiculos = this.vehiculos.filter(v => v.id_vehiculo !== id);
          this.filteredVehiculos = this.filteredVehiculos.filter(v => v.id_vehiculo !== id);
        },
        error: (error) => {
          this.error = 'Error al eliminar el vehículo';
          console.error('Error:', error);
        }
      });
    }
  }
}


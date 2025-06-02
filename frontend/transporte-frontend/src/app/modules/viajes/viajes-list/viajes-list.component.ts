import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Viaje } from '../../../models/viaje.model';
import { ViajeService } from '../../../services/viaje.service';

@Component({
  selector: 'app-viajes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.css']
})
export class ViajesListComponent implements OnInit {
  viajes: Viaje[] = [];
  filteredViajes: Viaje[] = [];
  searchTerm: string = '';
  searchField: string = 'origen';
  loading: boolean = false;
  error: string | null = null;

  constructor(private viajeService: ViajeService) {}

  ngOnInit(): void {
    this.loadViajes();
  }

  loadViajes(): void {
    this.loading = true;
    this.viajeService.getAll().subscribe({
      next: (data) => {
        this.viajes = data;
        this.filteredViajes = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los viajes';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredViajes = [...this.viajes];
      return;
    }

    const searchValue = this.searchTerm.toLowerCase().trim();
    
    this.filteredViajes = this.viajes.filter(viaje => {
      switch (this.searchField) {
        case 'origen':
          return viaje.origen.toLowerCase().includes(searchValue);
        case 'destino':
          return viaje.destino.toLowerCase().includes(searchValue);
        case 'vehiculo':
          return viaje.vehiculo_placa?.toLowerCase().includes(searchValue);
        case 'cliente':
          return viaje.cliente_nombre?.toLowerCase().includes(searchValue);
        case 'estado':
          return viaje.estado_nombre?.toLowerCase().includes(searchValue);
        default:
          return false;
      }
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'en curso':
        return 'bg-primary';
      case 'completado':
        return 'bg-success';
      case 'cancelado':
        return 'bg-danger';
      case 'pendiente':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }

  deleteViaje(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Está seguro que desea eliminar este viaje?')) {
      this.viajeService.delete(id).subscribe({
        next: () => {
          this.viajes = this.viajes.filter(v => v.id_viaje !== id);
          this.filteredViajes = this.filteredViajes.filter(v => v.id_viaje !== id);
        },
        error: (error) => {
          this.error = 'Error al eliminar el viaje';
          console.error('Error:', error);
        }
      });
    }
  }
}
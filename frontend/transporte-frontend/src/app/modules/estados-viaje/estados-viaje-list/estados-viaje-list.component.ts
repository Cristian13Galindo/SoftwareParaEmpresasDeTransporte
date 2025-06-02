import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EstadoViaje } from '../../../models/estado-viaje.model';
import { EstadoViajeService } from '../../../services/estado-viaje.service';

@Component({
  selector: 'app-estados-viaje-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './estados-viaje-list.component.html',
  styleUrls: ['./estados-viaje-list.component.css']
})
export class EstadosViajeListComponent implements OnInit {
  estados: EstadoViaje[] = [];
  filteredEstados: EstadoViaje[] = [];
  searchTerm: string = '';
  searchField: string = 'estado';
  loading: boolean = false;
  error: string | null = null;

  constructor(private estadoViajeService: EstadoViajeService) {}

  ngOnInit(): void {
    this.loadEstados();
  }

  loadEstados(): void {
    this.loading = true;
    this.estadoViajeService.getAll().subscribe({
      next: (data) => {
        this.estados = data;
        this.filteredEstados = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los estados';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredEstados = [...this.estados];
      return;
    }

    const searchValue = this.searchTerm.toLowerCase().trim();
    
    this.filteredEstados = this.estados.filter(estado => {
      switch (this.searchField) {
        case 'id':
          return estado.id_estado?.toString().includes(searchValue);
        case 'estado':
          return estado.estado.toLowerCase().includes(searchValue);
        default:
          return false;
      }
    });
  }

  deleteEstado(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Está seguro que desea eliminar este estado?')) {
      this.estadoViajeService.delete(id).subscribe({
        next: () => {
          this.estados = this.estados.filter(e => e.id_estado !== id);
          this.filteredEstados = this.filteredEstados.filter(e => e.id_estado !== id);
        },
        error: (error) => {
          this.error = 'Error al eliminar el estado';
          console.error('Error:', error);
        }
      });
    }
  }
}
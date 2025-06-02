import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConductorService } from '../../../services/conductor.service';
import { TokenService } from '../../../services/token.service';
import { Conductor } from '../../../models/conductor.model';

@Component({
  selector: 'app-conductores-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './conductores-list.component.html',
  styleUrls: ['./conductores-list.component.css'],
})
export class ConductoresListComponent implements OnInit {
  conductores: any[] = [];
  filteredConductores: any[] = [];
  searchTerm: string = '';
  searchField: string = 'nombre'; // Cambiado el valor por defecto
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private conductorService: ConductorService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    console.log('Token actual:', this.tokenService.getToken());
    this.loadConductores();
  }

  loadConductores(): void {
    this.loading = true;
    this.conductorService.getAll().subscribe({
      next: (data) => {
        console.log('Conductores cargados:', data);
        this.conductores = data;
        this.filteredConductores = data; // Inicialmente, los conductores filtrados son todos los conductores
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar conductores:', err);
        this.error = `Error al cargar los conductores: ${err.message || JSON.stringify(err)}`;
        this.loading = false;
      },
    });
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredConductores = [...this.conductores];
      return;
    }

    const searchValue = this.searchTerm.toLowerCase().trim();

    this.filteredConductores = this.conductores.filter(conductor => {
      switch (this.searchField) {
        case 'id':
          return conductor.id_conductor?.toString().includes(searchValue);
        case 'nombre':
          return conductor.nombre?.toLowerCase().includes(searchValue) ||
                 conductor.apellido?.toLowerCase().includes(searchValue);
        case 'cedula':
          return conductor.cedula?.toString().toLowerCase().includes(searchValue);
        case 'licencia':
          // Asegurarse de que el número de licencia se trate como string y se compare correctamente
          return conductor.licencia_conduccion?.toString().toLowerCase().includes(searchValue);
        default:
          return false;
      }
    });
  }

  deleteConductor(id: number | undefined): void {
    if (!id) return;

    if (confirm('¿Está seguro que desea eliminar este conductor?')) {
      this.conductorService.delete(id).subscribe({
        next: () => {
          this.conductores = this.conductores.filter((c) => c.id_conductor !== id);
          this.filteredConductores = this.filteredConductores.filter((c) => c.id_conductor !== id); // También actualizar la lista filtrada
        },
        error: (err) => {
          console.error('Error al eliminar el conductor:', err);
          this.error = 'Error al eliminar el conductor.';
        },
      });
    }
  }
}
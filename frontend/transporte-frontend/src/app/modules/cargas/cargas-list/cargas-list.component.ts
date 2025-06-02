import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CargaService } from '../../../services/carga.service';
import { TokenService } from '../../../services/token.service';
import { Carga } from '../../../models/carga.model';

@Component({
  selector: 'app-cargas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cargas-list.component.html',
  styleUrls: ['./cargas-list.component.css']
})
export class CargasListComponent implements OnInit {
  cargas: Carga[] = [];
  filteredCargas: Carga[] = [];
  searchTerm: string = '';
  searchField: string = 'id'; // Add this property
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private cargaService: CargaService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.loadCargas();
  }

  loadCargas(): void {
    this.loading = true;
    this.cargaService.getAll().subscribe({
      next: (data) => {
        this.cargas = data;
        this.filteredCargas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = `Error al cargar las cargas: ${err.message}`;
        this.loading = false;
      }
    });
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredCargas = [...this.cargas];
      return;
    }
    const searchValue = this.searchTerm.toLowerCase().trim();
    this.filteredCargas = this.cargas.filter(carga => 
      carga.id_carga?.toString().includes(searchValue)
    );
  }

  deleteCarga(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Está seguro que desea eliminar esta carga?')) {
      this.cargaService.delete(id).subscribe({
        next: () => {
          this.cargas = this.cargas.filter(c => c.id_carga !== id);
          this.filteredCargas = this.filteredCargas.filter(c => c.id_carga !== id);
        },
        error: (err) => {
          this.error = 'Error al eliminar la carga.';
        }
      });
    }
  }
}
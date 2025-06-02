import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DestinatarioFinal } from '../../../models/destinatario.model';
import { DestinatarioService } from '../../../services/destinatario.service';

@Component({
  selector: 'app-destinatarios-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './destinatarios-list.component.html',
  styleUrls: ['./destinatarios-list.component.css']
})
export class DestinatariosListComponent implements OnInit {
  destinatarios: DestinatarioFinal[] = [];
  filteredDestinatarios: DestinatarioFinal[] = [];
  searchTerm: string = '';
  searchField: string = 'empresa';
  loading: boolean = false;
  error: string | null = null;

  constructor(private destinatarioService: DestinatarioService) {}

  ngOnInit(): void {
    this.loadDestinatarios();
  }

  loadDestinatarios(): void {
    this.loading = true;
    this.error = null;

    this.destinatarioService.getAll().subscribe({
      next: (data) => {
        console.log('Destinatarios cargados:', data);
        this.destinatarios = data;
        this.filteredDestinatarios = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar destinatarios:', error);
        this.error = typeof error === 'string' ? error : 'Error al cargar los destinatarios';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredDestinatarios = [...this.destinatarios];
      return;
    }

    const searchValue = this.searchTerm.toLowerCase().trim();
    
    this.filteredDestinatarios = this.destinatarios.filter(destinatario => {
      switch (this.searchField) {
        case 'id':
          return destinatario.id_destinatario?.toString().includes(searchValue);
        case 'empresa':
          return destinatario.nombre_empresa.toLowerCase().includes(searchValue);
        case 'direccion':
          return destinatario.direccion.toLowerCase().includes(searchValue);
        default:
          return false;
      }
    });
  }

  deleteDestinatario(id: number | undefined): void {
    if (!id) {
      console.error('ID no válido');
      return;
    }
    
    if (confirm('¿Está seguro que desea eliminar este destinatario?')) {
      this.destinatarioService.delete(id).subscribe({
        next: () => {
          console.log('Destinatario eliminado correctamente');
          this.destinatarios = this.destinatarios.filter(d => d.id_destinatario !== id);
          this.filteredDestinatarios = this.filteredDestinatarios.filter(d => d.id_destinatario !== id);
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          this.error = typeof error === 'string' ? error : 'Error al eliminar el destinatario';
        }
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Factura } from '../../../models/factura.model';
import { FacturaService } from '../../../services/factura.service';

@Component({
  selector: 'app-facturas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './facturas-list.component.html',
  styleUrls: ['./facturas-list.component.css']
})
export class FacturasListComponent implements OnInit {
  facturas: Factura[] = [];
  filteredFacturas: Factura[] = [];
  searchTerm: string = '';
  searchField: string = 'numero';
  loading: boolean = false;
  error: string | null = null;

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.loadFacturas();
  }

  loadFacturas(): void {
    this.loading = true;
    this.facturaService.getAll().subscribe({
      next: (data) => {
        this.facturas = data;
        this.filteredFacturas = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las facturas';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredFacturas = [...this.facturas];
      return;
    }

    const searchValue = this.searchTerm.toLowerCase().trim();
    
    this.filteredFacturas = this.facturas.filter(factura => {
      switch (this.searchField) {
        case 'numero':
          return factura.numero_factura.toLowerCase().includes(searchValue);
        case 'cliente':
          return factura.cliente_nombre?.toLowerCase().includes(searchValue);
        case 'estado':
          return factura.estado_pago.toLowerCase().includes(searchValue);
        default:
          return false;
      }
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pagada':
        return 'bg-success';
      case 'pendiente':
        return 'bg-warning';
      case 'vencida':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  deleteFactura(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Está seguro que desea eliminar esta factura?')) {
      this.facturaService.delete(id).subscribe({
        next: () => {
          this.facturas = this.facturas.filter(f => f.id_factura !== id);
          this.filteredFacturas = this.filteredFacturas.filter(f => f.id_factura !== id);
        },
        error: (error) => {
          this.error = 'Error al eliminar la factura';
          console.error('Error:', error);
        }
      });
    }
  }
}
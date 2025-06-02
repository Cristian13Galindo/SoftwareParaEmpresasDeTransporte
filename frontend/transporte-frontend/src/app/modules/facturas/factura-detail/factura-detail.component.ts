import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Factura } from '../../../models/factura.model';
import { FacturaService } from '../../../services/factura.service';

@Component({
  selector: 'app-factura-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './factura-detail.component.html',
  styleUrls: ['./factura-detail.component.css']
})
export class FacturaDetailComponent implements OnInit {
  factura: Factura | null = null;
  loading = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facturaService: FacturaService
  ) {}
  
  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID no válido';
      this.loading = false;
      return;
    }
    
    this.facturaService.getById(Number(id)).subscribe({
      next: (data) => {
        this.factura = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos de la factura';
        this.loading = false;
        console.error(err);
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

  onDelete(): void {
    if (!this.factura?.id_factura) return;

    if (confirm('¿Está seguro de eliminar esta factura?')) {
      this.facturaService.delete(this.factura.id_factura).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/facturas']);
        },
        error: (err) => {
          this.error = 'Error al eliminar la factura';
          console.error(err);
        }
      });
    }
  }
}
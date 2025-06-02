import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Viaje } from '../../../models/viaje.model';
import { ViajeService } from '../../../services/viaje.service';

@Component({
  selector: 'app-viaje-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './viaje-detail.component.html',
  styleUrls: ['./viaje-detail.component.css']
})
export class ViajeDetailComponent implements OnInit {
  viaje: Viaje | null = null;
  loading = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viajeService: ViajeService
  ) {}
  
  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID no válido';
      this.loading = false;
      return;
    }
    
    this.viajeService.getById(Number(id)).subscribe({
      next: (data) => {
        this.viaje = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del viaje';
        this.loading = false;
        console.error(err);
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

  onDelete(): void {
    if (!this.viaje?.id_viaje) return;

    if (confirm('¿Está seguro de eliminar este viaje?')) {
      this.viajeService.delete(this.viaje.id_viaje).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/viajes']);
        },
        error: (err) => {
          this.error = 'Error al eliminar el viaje';
          console.error(err);
        }
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EstadoViaje } from '../../../models/estado-viaje.model';
import { EstadoViajeService } from '../../../services/estado-viaje.service';

@Component({
  selector: 'app-estado-viaje-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './estado-viaje-detail.component.html',
  styleUrls: ['./estado-viaje-detail.component.css']
})
export class EstadoViajeDetailComponent implements OnInit {
  estadoViaje: EstadoViaje | null = null;
  loading = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estadoViajeService: EstadoViajeService
  ) {}
  
  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID no válido';
      this.loading = false;
      return;
    }
    
    this.estadoViajeService.getById(Number(id)).subscribe({
      next: (data) => {
        this.estadoViaje = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del estado';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onDelete(): void {
    if (!this.estadoViaje?.id_estado) return;

    if (confirm('¿Está seguro de eliminar este estado?')) {
      this.estadoViajeService.delete(this.estadoViaje.id_estado).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/estados-viaje']);
        },
        error: (err) => {
          this.error = 'Error al eliminar el estado';
          console.error(err);
        }
      });
    }
  }
}
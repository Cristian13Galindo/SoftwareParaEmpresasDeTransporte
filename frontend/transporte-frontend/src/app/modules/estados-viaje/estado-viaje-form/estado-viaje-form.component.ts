import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EstadoViaje } from '../../../models/estado-viaje.model';
import { EstadoViajeService } from '../../../services/estado-viaje.service';

@Component({
  selector: 'app-estado-viaje-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './estado-viaje-form.component.html'
})
export class EstadoViajeFormComponent implements OnInit {
  estadoViaje: EstadoViaje = {
    estado: ''
  };
  
  isEditing = false;
  loading = false;
  saving = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estadoViajeService: EstadoViajeService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loading = true;
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
  }
  
  onSubmit(): void {
    this.saving = true;
    this.error = '';
    
    const operation = this.isEditing 
      ? this.estadoViajeService.update(this.estadoViaje)
      : this.estadoViajeService.create(this.estadoViaje);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/dashboard/estados-viaje']);
      },
      error: (err) => {
        this.error = err;
        this.saving = false;
      }
    });
  }
}
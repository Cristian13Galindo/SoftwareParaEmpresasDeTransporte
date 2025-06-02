import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Carga } from '../../../models/carga.model';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-carga-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './carga-form.component.html'
})
export class CargaFormComponent implements OnInit {
  carga: Carga = {
    tipo_carga: '',
    peso_toneladas: 0,
    descripcion: '',
    precio_por_tonelada: 0
  };
  
  isEditing = false;
  loading = false;
  saving = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cargaService: CargaService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loading = true;
      this.cargaService.getById(Number(id)).subscribe({
        next: (data) => {
          this.carga = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los datos de la carga';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
  
  onSubmit(): void {
    this.saving = true;
    this.error = '';
    
    console.log('Enviando carga:', this.carga);

    if (this.isEditing) {
      this.cargaService.update(this.carga).subscribe({
        next: (response) => {
          console.log('Actualización exitosa:', response);
          this.router.navigate(['/dashboard/cargas']);
        },
        error: (err) => {
          console.error('Error completo:', err);
          this.error = typeof err === 'string' ? err : 'Error al actualizar la carga';
          this.saving = false;
        }
      });
    } else {
      this.cargaService.create(this.carga).subscribe({
        next: (response) => {
          console.log('Respuesta exitosa:', response);
          this.router.navigate(['/dashboard/cargas']);
        },
        error: (err) => {
          console.error('Error completo:', err);
          this.error = typeof err === 'string' ? err : 'Error al crear la carga';
          this.saving = false;
        }
      });
    }
  }
}
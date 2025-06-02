import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Conductor } from '../../../models/conductor.model';
import { ConductorService } from '../../../services/conductor.service';

@Component({
  selector: 'app-conductor-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './conductor-form.component.html'
})
export class ConductorFormComponent implements OnInit {
  conductor: Conductor = {
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    direccion: '',
    licencia_conduccion: '',
    fecha_vencimiento_licencia: ''
  };
  
  isEditing = false;
  loading = false;
  saving = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conductorService: ConductorService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loading = true;
      this.conductorService.getById(Number(id)).subscribe({
        next: (data) => {
          this.conductor = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los datos del conductor';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
  
  onSubmit(): void {
    this.saving = true;
    this.error = '';
    
    console.log('Enviando conductor:', this.conductor); // Para depuración

    if (this.isEditing) {
      // Si estamos editando, llamamos a update en lugar de create
      this.conductorService.update(this.conductor).subscribe({
        next: (response) => {
          console.log('Actualización exitosa:', response);
          this.router.navigate(['/dashboard/conductores']);
        },
        error: (err) => {
          console.error('Error completo:', err);
          this.error = typeof err === 'string' ? err : 'Error al actualizar el conductor';
          this.saving = false;
        }
      });
    } else {
      // Si es nuevo conductor, llamamos a create como antes
      this.conductorService.create(this.conductor).subscribe({
        next: (response) => {
          console.log('Respuesta exitosa:', response);
          this.router.navigate(['/dashboard/conductores']);
        },
        error: (err) => {
          console.error('Error completo:', err);
          this.error = typeof err === 'string' ? err : 'Error al crear el conductor';
          this.saving = false;
        }
      });
    }
  }
}
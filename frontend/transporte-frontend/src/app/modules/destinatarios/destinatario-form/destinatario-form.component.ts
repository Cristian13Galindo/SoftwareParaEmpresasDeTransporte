import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DestinatarioFinal } from '../../../models/destinatario.model';
import { DestinatarioService } from '../../../services/destinatario.service';

@Component({
  selector: 'app-destinatario-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './destinatario-form.component.html'
})
export class DestinatarioFormComponent implements OnInit {
  destinatario: DestinatarioFinal = {
    nombre_empresa: '',
    direccion: '',
    telefono: ''
  };
  
  isEditing = false;
  loading = false;
  saving = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destinatarioService: DestinatarioService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loading = true;
      this.destinatarioService.getById(Number(id)).subscribe({
        next: (data) => {
          this.destinatario = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los datos del destinatario';
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
      ? this.destinatarioService.update(this.destinatario)
      : this.destinatarioService.create(this.destinatario);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/dashboard/destinatarios']);
      },
      error: (err) => {
        this.error = err;
        this.saving = false;
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnInit {
  cliente: Cliente = {
    nombre_empresa: '',
    nit: '',
    contacto: '',
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
    private clienteService: ClienteService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loading = true;
      this.clienteService.getById(Number(id)).subscribe({
        next: (data) => {
          this.cliente = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los datos del cliente';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
  
  onSubmit(): void {
    this.saving = true;
    this.error = '';
    
    if (this.isEditing) {
      this.clienteService.update(this.cliente).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/clientes']);
        },
        error: (err) => {
          this.error = typeof err === 'string' ? err : 'Error al actualizar el cliente';
          this.saving = false;
        }
      });
    } else {
      this.clienteService.create(this.cliente).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/clientes']);
        },
        error: (err) => {
          this.error = typeof err === 'string' ? err : 'Error al crear el cliente';
          this.saving = false;
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css']
})
export class ClienteDetailComponent implements OnInit {
  cliente: Cliente | null = null;
  loading = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}
  
  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID no válido';
      this.loading = false;
      return;
    }
    
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

  onDelete(): void {
    if (!this.cliente?.id_cliente) return;

    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteService.delete(this.cliente.id_cliente).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/clientes']);
        },
        error: (err) => {
          this.error = 'Error al eliminar el cliente';
          console.error(err);
        }
      });
    }
  }
}
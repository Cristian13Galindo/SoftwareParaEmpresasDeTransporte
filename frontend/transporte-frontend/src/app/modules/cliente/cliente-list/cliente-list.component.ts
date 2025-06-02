import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];
  searchTerm: string = '';
  searchField: string = 'id'; 
  loading: boolean = false;
  error: string | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.loading = true;
    this.clienteService.getAll().subscribe({
      next: (data) => {
        console.log('Clientes cargados:', data);
        this.clientes = data;
        this.filteredClientes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        this.error = `Error al cargar los clientes: ${err.message || JSON.stringify(err)}`;
        this.loading = false;
      }
    });
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredClientes = [...this.clientes];
      return;
    }

    const searchValue = this.searchTerm.toLowerCase().trim();

    this.filteredClientes = this.clientes.filter(cliente => {
      switch (this.searchField) {
        case 'id':
          return cliente.id_cliente?.toString().includes(searchValue);
        case 'empresa':
          return cliente.nombre_empresa.toLowerCase().includes(searchValue);
        case 'nit':
          return cliente.nit.toLowerCase().includes(searchValue);
        case 'contacto':
          return cliente.contacto.toLowerCase().includes(searchValue);
        default:
          return false;
      }
    });
  }

  deleteCliente(id: number | undefined): void {
    if (!id) return;

    if (confirm('¿Está seguro que desea eliminar este cliente?')) {
      this.clienteService.delete(id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(c => c.id_cliente !== id);
          this.filteredClientes = this.filteredClientes.filter(c => c.id_cliente !== id);
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          this.error = 'Error al eliminar el cliente';
        }
      });
    }
  }
}

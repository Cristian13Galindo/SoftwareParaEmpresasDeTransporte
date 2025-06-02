import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Factura } from '../../../models/factura.model';
import { FacturaService } from '../../../services/factura.service';
import { ClienteService } from '../../../services/cliente.service';
import { ViajeService } from '../../../services/viaje.service';

@Component({
  selector: 'app-factura-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './factura-form.component.html'
})
export class FacturaFormComponent implements OnInit {
  factura: Factura = {
    numero_factura: '',
    fecha_emision: '',
    fecha_vencimiento: '',
    subtotal: 0,
    iva: 0,
    total: 0,
    estado_pago: '',
    metodo_pago: '',
    cliente: 0,
    viaje: 0
  };
  
  clientes: any[] = [];
  viajes: any[] = [];
  isEditing = false;
  loading = false;
  saving = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private viajeService: ViajeService
  ) {}
  
  ngOnInit(): void {
    this.loadClientes();
    this.loadViajes();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loading = true;
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
  }

  loadClientes(): void {
    this.clienteService.getAll().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Error cargando clientes:', err)
    });
  }

  loadViajes(): void {
    this.viajeService.getAll().subscribe({
      next: (data) => this.viajes = data,
      error: (err) => console.error('Error cargando viajes:', err)
    });
  }
  
  onSubmit(): void {
    this.saving = true;
    this.error = '';
    
    const operation = this.isEditing 
      ? this.facturaService.update(this.factura)
      : this.facturaService.create(this.factura);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/dashboard/facturas']);
      },
      error: (err) => {
        this.error = err;
        this.saving = false;
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Viaje } from '../../../models/viaje.model';
import { ViajeService } from '../../../services/viaje.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ClienteService } from '../../../services/cliente.service';
import { DestinatarioService } from '../../../services/destinatario.service';
import { EstadoViajeService } from '../../../services/estado-viaje.service';

@Component({
  selector: 'app-viaje-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './viaje-form.component.html'
})
export class ViajeFormComponent implements OnInit {
  viaje: Viaje = {
    fecha_salida: '',
    fecha_llegada: '',
    origen: '',
    destino: '',
    costo_total: 0,
    id_vehiculo: 0,
    id_carga: 0,
    id_cliente: 0,
    id_destinatario: 0,
    id_estado: 0
  };
  
  vehiculos: any[] = [];
  clientes: any[] = [];
  destinatarios: any[] = [];
  estados: any[] = [];
  isEditing = false;
  loading = false;
  saving = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viajeService: ViajeService,
    private vehiculoService: VehiculoService,
    private clienteService: ClienteService,
    private destinatarioService: DestinatarioService,
    private estadoViajeService: EstadoViajeService
  ) {}
  
  ngOnInit(): void {
    this.loadRelatedData();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loading = true;
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
  }

  loadRelatedData(): void {
    this.vehiculoService.getAll().subscribe({
      next: (data) => this.vehiculos = data,
      error: (err) => console.error('Error cargando vehículos:', err)
    });

    this.clienteService.getAll().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Error cargando clientes:', err)
    });

    this.destinatarioService.getAll().subscribe({
      next: (data) => this.destinatarios = data,
      error: (err) => console.error('Error cargando destinatarios:', err)
    });

    this.estadoViajeService.getAll().subscribe({
      next: (data) => this.estados = data,
      error: (err) => console.error('Error cargando estados:', err)
    });
  }
  
  onSubmit(): void {
    this.saving = true;
    this.error = '';
    
    const operation = this.isEditing 
      ? this.viajeService.update(this.viaje)
      : this.viajeService.create(this.viaje);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/dashboard/viajes']);
      },
      error: (err) => {
        this.error = err;
        this.saving = false;
      }
    });
  }
}
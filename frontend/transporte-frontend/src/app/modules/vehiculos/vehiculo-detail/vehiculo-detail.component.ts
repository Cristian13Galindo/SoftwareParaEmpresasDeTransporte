import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehiculo-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vehiculo-detail.component.html',
  styleUrls: ['./vehiculo-detail.component.css']
})
export class VehiculoDetailComponent implements OnInit {
  vehiculoId?: number;
  vehiculo: any = {};
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vehiculoId = +params['id'];
      this.loadVehiculo();
    });
  }

  loadVehiculo(): void {
    if (!this.vehiculoId) return;
    
    this.loading = true;
    
    // Simulamos la carga de datos
    setTimeout(() => {
      // Datos de prueba según el ID
      if (this.vehiculoId === 1) {
        this.vehiculo = {
          id: 1,
          placa: 'ABC123',
          marca: 'Volvo',
          modelo: 'FH16',
          anno: 2022,
          capacidad: 20000,
          tipo: 'Camión',
          estado: 'Activo',
          fecha_compra: '2022-01-15',
          kilometraje: 15000,
          conductor_nombre: 'Juan Pérez'
        };
      } else if (this.vehiculoId === 2) {
        this.vehiculo = {
          id: 2,
          placa: 'XYZ789',
          marca: 'Mercedes',
          modelo: 'Actros',
          anno: 2021,
          capacidad: 18000,
          tipo: 'Furgón',
          estado: 'Mantenimiento',
          fecha_compra: '2021-06-20',
          kilometraje: 22000,
          conductor_nombre: 'Carlos Rodríguez'
        };
      } else {
        this.error = 'No se encontró el vehículo';
      }
      
      this.loading = false;
    }, 500);
  }
}
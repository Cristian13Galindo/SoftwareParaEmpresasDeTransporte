import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="mt-4 mb-4">Dashboard</h2>
      
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Vehículos</h5>
              <p class="card-text">Gestionar la flota de vehículos</p>
              <a routerLink="/vehiculos" class="btn btn-primary">Acceder</a>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Conductores</h5>
              <p class="card-text">Gestionar los conductores</p>
              <a routerLink="/conductores" class="btn btn-primary">Acceder</a>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Viajes</h5>
              <p class="card-text">Gestionar los viajes</p>
              <a routerLink="/viajes" class="btn btn-primary">Acceder</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}
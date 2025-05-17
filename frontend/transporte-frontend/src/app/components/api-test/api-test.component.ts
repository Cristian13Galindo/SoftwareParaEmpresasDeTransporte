import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Añadir esta importación
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],  // Añadir RouterModule aquí
  template: `
    <div class="container mt-4">
      <h2>API Test Center</h2>
      
      <div class="card mb-4">
        <div class="card-header">API Status</div>
        <div class="card-body">
          <button class="btn btn-primary" (click)="checkApiStatus()">Verificar API</button>
          
          <div *ngIf="apiStatus" class="mt-3">
            <pre class="bg-light p-3">{{ apiStatus | json }}</pre>
          </div>
          
          <div *ngIf="apiError" class="alert alert-danger mt-3">
            {{ apiError }}
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">Auth Test</div>
        <div class="card-body">
          <div class="mb-3">
            <label for="username" class="form-label">Usuario</label>
            <input type="text" class="form-control" id="username" [(ngModel)]="username">
          </div>
          
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" [(ngModel)]="password">
          </div>
          
          <button class="btn btn-primary" (click)="testAuth()">Probar Auth</button>
          
          <div *ngIf="authResult" class="mt-3">
            <pre class="bg-light p-3">{{ authResult | json }}</pre>
          </div>
          
          <div *ngIf="authError" class="alert alert-danger mt-3">
            {{ authError }}
          </div>
        </div>
      </div>
      
      <div class="mt-3">
        <a routerLink="/dashboard" class="btn btn-secondary">Volver al Dashboard</a>
      </div>
    </div>
  `
})
export class ApiTestComponent implements OnInit {
  apiStatus: any;
  apiError: string = '';
  
  username: string = '';
  password: string = '';
  authResult: any;
  authError: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  checkApiStatus() {
    this.apiStatus = null;
    this.apiError = '';
    
    this.apiService.getApiStatus().subscribe({
      next: (data) => {
        this.apiStatus = data;
      },
      error: (error) => {
        console.error('Error de API:', error);
        this.apiError = `Error: ${error.status} - ${error.statusText}`;
      }
    });
  }

  testAuth() {
    if (!this.username || !this.password) {
      this.authError = 'Por favor ingrese usuario y contraseña';
      return;
    }
    
    this.authResult = null;
    this.authError = '';
    
    this.apiService.testAuth(this.username, this.password).subscribe({
      next: (data) => {
        this.authResult = data;
      },
      error: (error) => {
        console.error('Error de Auth:', error);
        this.authError = `Error: ${error.status} - ${error.statusText || error.message}`;
      }
    });
  }
}
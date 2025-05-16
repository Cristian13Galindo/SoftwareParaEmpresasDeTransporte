import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow">
            <div class="card-header bg-primary text-white text-center">
              <h4>Iniciar Sesión</h4>
            </div>
            <div class="card-body">
              <form (ngSubmit)="onLogin()">
                <div class="mb-3">
                  <label for="username" class="form-label">Usuario</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="username" 
                    name="username"
                    [(ngModel)]="username" 
                    required
                  >
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    name="password"
                    [(ngModel)]="password" 
                    required
                  >
                </div>
                <div class="d-grid">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    [disabled]="isLoading"
                  >
                    {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                  </button>
                </div>
              </form>
              <div *ngIf="errorMessage" class="alert alert-danger mt-3">
                {{ errorMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor ingrese usuario y contraseña';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulamos una autenticación exitosa
    setTimeout(() => {
      this.isLoading = false;
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}
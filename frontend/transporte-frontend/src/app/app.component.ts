import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="container mt-3">
      <h1>Sistema de Gestión de Transporte</h1>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'transporte-frontend';
}
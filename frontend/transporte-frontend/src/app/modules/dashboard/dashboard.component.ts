import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}
  
  logout(): void {
    // Aquí puedes agregar lógica para limpiar tokens, etc.
    localStorage.removeItem('auth_token');
    sessionStorage.clear();
    
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}

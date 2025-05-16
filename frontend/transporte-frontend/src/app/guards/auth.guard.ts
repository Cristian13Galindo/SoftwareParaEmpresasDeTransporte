import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Para propósitos de prueba, siempre devuelve true
    return true;
    
    /* Código original - lo usaremos después cuando tengamos la autenticación real
    if (this.authService.isAuthenticated()) {
      return true;
    }
    
    // Redirigir al login si no está autenticado
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
    */
  }
}
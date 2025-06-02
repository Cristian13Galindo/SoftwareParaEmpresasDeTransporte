import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Usar auth_token para mantener consistencia con TokenService
  const accessToken = localStorage.getItem('auth_token');
  
  console.log('Interceptando solicitud:', req.url);
  console.log('Token disponible:', !!accessToken);
  
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error en solicitud HTTP:', error);
      
      if (error.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        
        // Redirigir manualmente a la página de login
        window.location.href = '/login';
      }
      return throwError(() => error);
    })
  );
};
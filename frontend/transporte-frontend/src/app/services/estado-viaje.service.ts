import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EstadoViaje } from '../models/estado-viaje.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoViajeService {
  private apiUrl = 'http://localhost:8000/api/estadoviaje/estados-viaje';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = error.error.message;
    } else {
      // Error del backend
      errorMessage = error.error?.detail || error.error?.message || 'Error del servidor';
      console.error('Error del backend:', error.error);
    }
    return throwError(() => errorMessage);
  }

  getAll(): Observable<EstadoViaje[]> {
    return this.http.get<EstadoViaje[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<EstadoViaje> {
    return this.http.get<EstadoViaje>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(estadoViaje: EstadoViaje): Observable<EstadoViaje> {
    console.log('Datos a enviar:', estadoViaje);
    
    return this.http.post<EstadoViaje>(`${this.apiUrl}/`, estadoViaje, { headers: this.headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error detallado:', error);
          
          if (error.status === 0) {
            return throwError(() => 'Error de conexión con el servidor. Verifica que el backend esté funcionando.');
          }
          
          if (error.status === 401) {
            return throwError(() => 'No autorizado. Por favor, inicia sesión nuevamente.');
          }
          
          const mensajeError = error.error?.detail || error.error?.message || 'Error desconocido del servidor';
          return throwError(() => `Error: ${mensajeError}`);
        })
      );
  }

  update(estadoViaje: EstadoViaje): Observable<EstadoViaje> {
    return this.http.put<EstadoViaje>(`${this.apiUrl}/${estadoViaje.id_estado}`, estadoViaje, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        console.error('Error en update:', err);
        return throwError(() => err?.error?.message || 'Error al actualizar el estado del viaje');
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}

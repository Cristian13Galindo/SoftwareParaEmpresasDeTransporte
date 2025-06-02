import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carga } from '../models/carga.model';

@Injectable({
  providedIn: 'root'
})
export class CargaService {
  private apiUrl = 'http://localhost:8000/api/carga/cargas';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.detail || error.error?.message || 'Error del servidor';
      console.error('Error del backend:', error.error);
    }
    return throwError(() => errorMessage);
  }

  getAll(): Observable<Carga[]> {
    return this.http.get<Carga[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<Carga> {
    return this.http.get<Carga>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(carga: Carga): Observable<Carga> {
    console.log('Datos a enviar:', carga);
    
    return this.http.post<Carga>(`${this.apiUrl}/`, carga, { headers: this.headers })
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

  update(carga: Carga): Observable<Carga> {
    return this.http.put<Carga>(`${this.apiUrl}/${carga.id_carga}/`, carga, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        console.error('Error en update:', err);
        return throwError(() => err?.error?.message || 'Error al actualizar la carga');
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

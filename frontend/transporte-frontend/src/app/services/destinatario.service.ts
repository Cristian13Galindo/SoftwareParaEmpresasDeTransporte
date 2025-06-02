import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DestinatarioFinal } from '../models/destinatario.model';

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {
  // Actualizar la URL según la ruta que se muestra en Django admin
  private apiUrl = 'http://localhost:8000/api/destinatariofinal/destinatarios';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('Error detallado:', error);
    
    let errorMessage = 'Ocurrió un error';
    if (error.status === 0) {
      errorMessage = 'Error de conexión con el servidor. Verifique que el backend esté funcionando.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = error.error?.detail || error.error?.message || `Error del servidor: ${error.status}`;
    }
    
    return throwError(() => errorMessage);
  }

  getAll(): Observable<DestinatarioFinal[]> {
    return this.http.get<DestinatarioFinal[]>(this.apiUrl, { headers: this.headers })
      .pipe(
        catchError((error) => {
          console.error('Error en getAll:', error);
          return throwError(() => 'Error al cargar los destinatarios. Por favor, intente nuevamente.');
        })
      );
  }

  getById(id: number): Observable<DestinatarioFinal> {
    return this.http.get<DestinatarioFinal>(`${this.apiUrl}/${id}/`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  create(destinatario: DestinatarioFinal): Observable<DestinatarioFinal> {
    console.log('Datos a enviar:', destinatario);
    
    return this.http.post<DestinatarioFinal>(`${this.apiUrl}/`, destinatario, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  update(destinatario: DestinatarioFinal): Observable<DestinatarioFinal> {
    if (!destinatario.id_destinatario) {
      return throwError(() => 'ID de destinatario no válido');
    }

    return this.http.put<DestinatarioFinal>(
      `${this.apiUrl}/${destinatario.id_destinatario}/`, 
      destinatario, 
      { headers: this.headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }
}

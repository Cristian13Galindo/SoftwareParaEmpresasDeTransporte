import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  protected apiUrl: string;

  constructor(
    protected http: HttpClient,
    protected endpoint: string
  ) {
    this.apiUrl = `${environment.apiUrl}/${endpoint}`;
  }

  getAll(params?: any): Observable<T[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    
    return this.http.get<T[]>(this.apiUrl, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item)
      .pipe(catchError(this.handleError));
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 0) {
        errorMessage = 'No se puede conectar con el servidor. Verifique su conexión a internet.';
      } else if (error.status === 401) {
        errorMessage = 'No autorizado. Por favor inicie sesión nuevamente.';
      } else if (error.status === 403) {
        errorMessage = 'Acceso prohibido. No tiene permisos para realizar esta acción.';
      } else if (error.status === 404) {
        errorMessage = 'Recurso no encontrado.';
      } else if (error.status >= 500) {
        errorMessage = `Error del servidor: ${error.status}. Por favor contacte al administrador.`;
      } else if (error.error && typeof error.error === 'object') {
        // Intentar extraer mensaje de error del backend
        const serverError = error.error;
        if (typeof serverError.message === 'string') {
          errorMessage = serverError.message;
        } else if (typeof serverError.detail === 'string') {
          errorMessage = serverError.detail;
        }
      }
    }
    
    console.error('Error en la solicitud HTTP:', error);
    return throwError(() => new Error(errorMessage));
  }
}